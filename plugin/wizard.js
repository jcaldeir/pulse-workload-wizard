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
								
	console.log("Streaming Measurements");	
	console.log('WIZARD_TOTAL_METRICS %d %s', randomIntFromInterval(0,100), _conf.source);
	console.log('WIZARD_TOTAL_MEASUREMENTS %d %s', randomIntFromInterval(0,10000), _conf.source);	
}

exports.streamCustomMetrics = function() {
		
		console.log("Streaming Custom Measurements");	
		//Add your own custom metrics here...		
		//example - METRIC NAME, VALUE, SOURCE
		//console.log('WIZARD_CUSTOM_METRIC %d %s', randomIntFromInterval(0,100), _conf.source);				
}


