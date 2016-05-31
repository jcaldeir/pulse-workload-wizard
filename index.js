var _conf = require('./param.json');
var _wizard = require('./plugin/wizard.js'); 

var _interval =  _conf.pollInterval || 5000;

_wizard.loadMetrics();
_wizard.createMetrics();
_wizard.streamMeasurements();
_wizard.streamCustomMetrics();

function streamData()
{
	_wizard.streamMeasurements();
	_wizard.streamCustomMetrics();	
	setTimeout(streamData, _interval);
}

streamData();
