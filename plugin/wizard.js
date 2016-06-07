//wizard.js

var pulse = require('./rest-client.js');
var _conf = require('../param.json');
var _internal = require('./conf/conf.json');
var _ = require('underscore');
			
var exports = module.exports = {};
var loadedMetrics = [];
var numberOfRepositories = 0;
var totalMeasurements = 0;
var net = require('net');
var client = new net.Socket();
var data = "";
var MIN = 0;
var MAX = 1000000;
var executed = false;


//Init Process
function init()
{   
		// Add a 'data' event handler for the client socket
		// data is what the server sent to this socket
		client.on('data', function(data) {
			console.log('DATA: ' + data);
			// Close the client socket completely
			client.destroy();
		});

		// Add a 'close' event handler for the client socket
		client.on('close', function() {
				console.log('Connection closed');
		});

}

//run init() function
init();
		

//Process all the workload
		
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


exports.loadMetrics = function( streamData ) {
	
	//console.log("Loading Metrics");	
		 
		function processPersonalRepositoryCall(error, response, body) {
		
			if (error) { console.log("Loading Metrics Error\n" , error ); return; }
			
			if (response.statusCode != 200) {			  
			  
			  console.log("Loading Metrics Error\n %s \n %s " , response.statusCode, body );
			  
			}
			else {
			
				var result = JSON.parse(body);	
				//console.log("Personal Metrics Loaded \n", result);

				for (index in result) {
					
						var metric = result[index];
						loadedMetrics.push(metric.name);					
					
					}				
				executed = true;
				createMetrics(result, null);			
			}
		}
		

		function processVerticalsCall(error, response, body) {
					
			if (error) { console.log("Loading Metrics Error\n" , error ); return; }
			
			if (response.statusCode != 200) {			  
			  
			  console.log("Loading Metrics Error\n %s \n %s " , response.statusCode, body );
			  
			}
			else {
			
				var result = JSON.parse(body);	
				//console.log("Vertical Metrics Loaded \n", result);

				for (index in result) {
					
						var metric = result[index];
						loadedMetrics.push(metric.name);					
					
					}
				
				createMetrics(result, null);	
				
				if ( executed ) return;	
				
				if ( _conf.personalRepository ) {
					numberOfRepositories++; //Load from personal repository
					executed = true;
					pulse.call( _conf.personalRepository + "/" + _internal.metricsFile, processPersonalRepositoryCall);		
				}
				
			}
		}
	
	
		function processInternalRepositoryCall(error, response, body) {
					
			if (error) { console.log("Loading Metrics Error\n" , error ); return; }
			
			if (response.statusCode != 200) {			  
			  
			  console.log("Loading Metrics Error\n %s \n %s " , response.statusCode, body );
			  
			}
			else {
			
				var result = JSON.parse(body);	
				//console.log("Internal Metrics Loaded \n", result);

				for (index in result) {
					
						var metric = result[index];
						loadedMetrics.push(metric.name);					
					
					}
				createMetrics(result, streamData);	
				
				if ( _conf.verticals )  {
						var verticals = _conf.verticals.split(",");
						for (index in verticals) //Load from internal repository + metrics from vertical industries
						{
							numberOfRepositories++;
							pulse.call( _internal.metricsRepository[0] + verticals[index] + "/" + _internal.metricsFile, processVerticalsCall);		
						}	
				}
				
			}
		}
	
	client.connect(9192, 'localhost' , function() {
		//console.log('CONNECTED TO: ' + 'localhost' + ':' + 9192);	
		for (index in _internal.metricsRepository) //Load from internal repository
			{
				numberOfRepositories++;
				pulse.call( _internal.metricsRepository[index] + _internal.metricsFile, processInternalRepositoryCall);		
			}			
	});
		
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
	var data_prefix = "{'jsonrpc':'2.0','method':'metric', 'params':{'data': ["
	var data_sufix = "]}}";
	var metrics = _.unique(loadedMetrics);	
	
	data = data_prefix;
	
	for (index in metrics) {
	
		var metric = metrics[index];
				
		if (index > 0 ) data+=",";
		data+= "'_bmetric:" + metric + "|v:" + randomIntFromInterval(MIN, MAX) + "|s:" + _conf.source + "'";		
		totalMeasurements++
	}

		data+= ",'_bmetric:" + "WIZARD_TOTAL_METRICS" + "|v:" + loadedMetrics.length + "|s:" + _conf.source + "',";
		data+= "'_bmetric:" + "WIZARD_TOTAL_MEASUREMENTS" + "|v:" + totalMeasurements + "|s:" + _conf.source + "'";		
		data+= data_sufix;
		//console.log(data);	
		client.write(data);		
		
	streamCustomMetrics();
}

function streamCustomMetrics() {
		
		//console.log("Streaming Custom Measurements");	
		//Add your own custom metrics here...		
		//example - METRIC NAME, VALUE, SOURCE
		//console.log('WIZARD_CUSTOM_METRIC %d %s', randomIntFromInterval(0,100), _conf.source);
	
}


