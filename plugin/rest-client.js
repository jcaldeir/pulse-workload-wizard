//rest-client.js

var _pulse = require('request');
var _internal = require('./conf/conf.json');
var _conf = require('../param.json');
			
var exports = module.exports = {};

var pulseAPI = _conf.pulseAPI;


exports.call = function( apiContext, callback) {
				
	//console.log("Calling External API");
		   
		    var callOptions = {
					url: apiContext 
				};
						
			_pulse.get(callOptions, callback);
					
}


exports.pulseAPICall = function( apiContext, postData, callback) {
				
	//console.log("Calling Pulse API");
						   
		    var callOptions = {
						  url: pulseAPI + apiContext,
						  body:  postData,
						  auth: {
								user: _conf.user,
								pass: _conf.pass,
								sendImmediately: true
							},
						  headers: {
							'Content-type' : 'application/json; charset=UTF-8' 
						 }
				};
				
			if (! postData) { _pulse.get(callOptions, callback);	return	}
			
			_pulse.post(callOptions, callback);					
}
