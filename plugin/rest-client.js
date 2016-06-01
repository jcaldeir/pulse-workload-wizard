//rest-client.js

var _pulse = require('request');
var _conf = require('../param.json');
			
var exports = module.exports = {};

var pulseAPI = _conf.pulseAPI;
var authorizationToken = _conf.authorizationToken;	

exports.call = function( apiContext, callback) {
				
	console.log("Calling External API");
		   
		    var callOptions = {
					url: apiContext 
				};
			
			 console.log(callOptions);
			
			_pulse.get(callOptions, callback);
					
}


exports.pulseAPICall = function( apiContext, postData, callback) {
				
	console.log("Calling Pulse API");
						   
		    var callOptions = {
						  url: pulseAPI + apiContext,
						  body:  postData,
						  headers: {
							'Authorization': authorizationToken,
							'Content-type' : 'application/json; charset=UTF-8' 
						 }
				};

			console.log(callOptions);
				
			if (! postData) { _pulse.get(callOptions, callback);	return	}
			
			_pulse.post(callOptions, callback);					
}
