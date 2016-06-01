var _conf = require('./param.json');
var _wizard = require('./plugin/wizard.js'); 

var _interval =  _conf.pollInterval || 5000;

_wizard.loadMetrics( streamData ); //On success start to stream data

function streamData()
{
	_wizard.streamMeasurements();
	setTimeout(streamData, _interval);
}

