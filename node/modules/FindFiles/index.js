var fs = require("fs");

/*
 * Travels through a directory structure and finds all files beneath it.
 * 
 * ARGS:
 *	path		- String:	The path of where to begin
 *	filters		- RegExp[]:	An array of all regular expressions to match against. (this will match against the whole path)
 *	onComplete	- function(path, err, dirs, files): The callback when search complete
 * 
 * TEST:
 *	findFiles("c:\\images", [/.*?\.png/], function(path, err, dirs, files) {
 *		console.log(dirs);
 *		console.log(files);
 *	});
 */
var findFiles = function(path, filters, onComplete) {
	var dirs = [];
	var files = [];
	
	fs.readdir(path, function(err, itemList) {
		// If fail, then
		if (err)
			return onComplete(path, err);
		
		var itemsLeft = itemList.length;
		
		if (!itemsLeft)
			return onComplete(path, null, dirs, files);
		
		itemList.forEach(function(item) {
			item = path + '\\' + item;
			
			fs.stat(item, function(err, stat) {
				
				// If has a valid state, then
				if (stat) {
					if (stat.isDirectory()) {
						// Add file to directory
						dirs.push(item);
						
						// Find files in directory
						findFiles(item, filters, function(path, err, moreDirs, moreFiles) {
							dirs = dirs.concat(moreDirs);
							files = files.concat(moreFiles);
							
							// If no more items, then complete
							if (!--itemsLeft)
								onComplete(path, null, dirs, files);
						});
						
					} else if (stat.isFile()) {
						if (!filters || filters.length == 0) {
							// If has no filters, then just add the file
							files.push(item);
							
						} else {
							// Otherwise, check if file matches any filter
							for (filter in filters) {
								if (filters[filter].test(item)) {
									files.push(item);
									break;
								}
							}
						}
						
						// If no more items, then complete
						if (!--itemsLeft)
							onComplete(path, null, dirs, files);
						
					} else {
						// Unknown type
						
					}
				}
			});
		});
	});
};