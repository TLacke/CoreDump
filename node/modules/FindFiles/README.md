# FindFiles.js

A simple file and directory finder.

## Installation

    $ npm install commander


## Example

	var ff = require("findfiles");
	
	ff.findFiles("c:\\temp", [/.*\.png/,/.*\.jpg/], function(path, err, dirs, files) {
		console.log("Directories found:");
		console.log(dirs);
		console.log("Files found:");
		console.log(files);
	}

## Methods
	
	findFiles(path, filter, onComplete)
		
		- path
			The path to traverse
			
		- filter
			null,		To return all directories and files.
			regexp[]	Array or regexp criterias to filter the wanted files (this filters on full path)
			
		- onComplete
			function(path, error, directores, files)
				- path
					The path that was executed
					
				- error
					Contains information if error occurred
					Null, on success
					
				- directories
					An array of all the directories found
					
				- files
					The files found

## Known issues

 - While the filter works on the full path of a file, it doesn't filter on the directories.
	Filter should be changed to one of these.
		- filter only on file name
		- have a directory filter and a file filter
		- remove directories that contains no valid file
 
 - Cannot enter a single regexp at this time, only array of regexp