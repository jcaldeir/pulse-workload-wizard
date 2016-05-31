//wizard.js

var _pulse = require('request');
var _conf = require('../param.json');
			
var exports = module.exports = {};
   
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

exports.loadMetrics = function() {
	
	console.log("Loading Metrics");			
	
}

exports.createMetrics = function() {
				
	console.log("Creating Metrics");	
				
}

exports.streamMeasurements = function() {
								
	console.log("Creating Measurements");	
						
}

exports.streamCustomMetrics = function() {
				
		//Add your own custom metrics here...		
		//example - METRIC NAME, VALUE, SOURCE
		//console.log('WIZARD_CUSTOM_METRIC %d %s', randomIntFromInterval(0,100), _source);				
}


