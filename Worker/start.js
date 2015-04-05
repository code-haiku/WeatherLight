var worker = require('./worker');
var configurationService = require('./Service/configurationService.js');

config = configurationService.instance.initializeFrom(process.argv.slice(2));

var outputErrors = function (errorsArray) {
    errorsArray.map(function (error) {
        console.error(error);
    })
}

if (!config.isValid) {
    outputErrors(config.errors);
    process.exit(1);
}

var start = function () {
    worker.instance.start(config);
}

start();
setInterval(start, 600000);