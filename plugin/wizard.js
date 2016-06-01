//wizard.js

var pulse = require('./rest-client.js');
var _conf = require('../param.json');
var _internal = require('./conf/conf.json');
			
var exports = module.exports = {};
var loadedMetrics = [];
var numberOfRepositories = 0;
var totalMeasurements = 0;
  
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

exports.loadMetrics = function( streamData ) {
	
	//console.log("Loading Metrics");	
		    
		function processCall(error, response, body) {
					
			if (error) { console.log("Loading Metrics Error\n" , error ); return; }
			
			if (response.statusCode != 200) {			  
			  
			  console.log("Loading Metrics Error\n %s \n %s " , response.statusCode, body );
			  
			}
			else {
			
				var result = JSON.parse(body);	
				//console.log("Metrics Loaded \n", result);

				for (index in result) {
					
						var metric = result[index];
						loadedMetrics.push(metric.name);					
					
					}
				createMetrics(result, streamData);								
			}
		}
		
	for (index in _internal.metricsRepository) //Load from internal repository
	{
		numberOfRepositories++;
		pulse.call( _internal.metricsRepository[index] + _internal.metricsFile, processCall);		
	}
      
	
	if ( _conf.verticals )  {
		var verticals = _conf.verticals.split(",");
		for (index in verticals) //Load from internal repository + metrics from vertical industries
		{
			numberOfRepositories++;
			pulse.call( _internal.metricsRepository[0] + verticals[index] + "/" + _internal.metricsFile, processCall);		
		}	
	}
	
	if ( _conf.personalRepository ) {
		numberOfRepositories++; //Load from personal repository
		pulse.call( _conf.personalRepository + "/" + _internal.metricsFile, processCall);		
	}
}

function createMetrics(metrics, streamData) {
				
	//console.log("\nCreating Metrics");
	
    var postData = JSON.stringify( metrics );
			
	function processCall(error, response, body) {
					
			if (error) { console.log("Creating Metrics Error\n" , error ); return; }
			
			if (response.statusCode != 200 && response.statusCode != 402) {			  
			  
			  console.log("Creating Metrics Error\n %s \n %s " , response.statusCode, body );
			  
			}
			else {
			
				//console.log("Metrics Created\n");	
				streamData();
			}
		}
		
	pulse.pulseAPICall( _internal.pulseCreateMetrics, postData, processCall);					 
}

exports.streamMeasurements = function() {

	//console.log("Streaming Default Measurements");		
	for (index in loadedMetrics) {
	
		var metric = loadedMetrics[index];
		console.log('WIZARD_GLOBAL_METRICS %d %s', randomIntFromInterval(0,100), _conf.source);
		console.log('WIZARD_GLOBAL_MEASUREMENTS %d %s', randomIntFromInterval(0,100), _conf.source);
		totalMeasurements++
	}
	
	streamCustomMetrics();
}

function streamCustomMetrics() {
		
		//console.log("Streaming Custom Measurements");	
		//Add your own custom metrics here...		
		//example - METRIC NAME, VALUE, SOURCE
		//console.log('WIZARD_CUSTOM_METRIC %d %s', randomIntFromInterval(0,100), _conf.source);
				
	console.log('WIZARD_TOTAL_METRICS %d %s', loadedMetrics.length, _conf.source);
	console.log('WIZARD_TOTAL_MEASUREMENTS %d %s', totalMeasurements, _conf.source);
	
}


