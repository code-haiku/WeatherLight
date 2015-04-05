var sys = require('sys');
var childProcessExec = require('child_process').exec;
var util = require('util');

var trafficLightService = function () {
    var commandTemplate = "clewarecontrol -d %d -c 1 -as %d %d";
    
    function puts(error, stdout, stderr) {
        sys.puts(stdout);
    }
    
    var turnOn = function (deviceNumber, colorNumber, isOn) {
        var commandToRun = util.format(commandTemplate, deviceNumber, colorNumber, (isOn) ? 1 : 0);
        console.log(commandToRun);
        childProcessExec(commandToRun, puts);
    }
       
    var setLights = function (deviceNumber, colors) {
        turnOn(deviceNumber, 0, colors.red);
        turnOn(deviceNumber, 1, colors.yellow);
        turnOn(deviceNumber, 2, colors.green);
    }
    
    return {
        setLights: setLights
    };
}();

exports.instance = trafficLightService;