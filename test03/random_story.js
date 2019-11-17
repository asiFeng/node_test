var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';

function checkForRSSFile(){
	fs.exists( configFilename, function(exists){
		if(!exists)
			return next( new Error('Missing RSS file: ' + configFilename));
		next(null, configFilename)
	})
}

checkForRSSFile();

