var weatherService = require("./Service/forecastIoWeatherService.js");
var colorSchemaComposer = require("./Service/colorSchemaComposer.js");
var trafficLightService = require("./Service/trafficLightService.js");

var worker = function (weatherService, colorSchemaComposer, trafficLightService) {
    var start = function start(configuration) {
        var onSuccess = function (weatherData) {
            var forecastedHours = configuration.hours;
            var colors = colorSchemaComposer.composeFrom(weatherData, forecastedHours);

            console.log(weatherData);
            console.log(colors);

            trafficLightService.setLights(configuration.deviceNumber, colors);
        };
                
        var handleError = function (error) {
            console.log(error);
        };
        
        weatherService.obtain(configuration.weatherServiceApiKey, onSuccess, handleError);
    }

    return {
        start: start
    };
}(weatherService.instance, colorSchemaComposer.instance, trafficLightService.instance);

exports.instance = worker;