// Obtains weather data.

var https = require('https');
var forecastIoWeatherAdapter = require("./forecastIoWeatherAdapter.js");
var util = require('util');

var forecastIoWeatherService = function (https, forecastIoWeatherAdapter) {
    var obtain = function (weatherServiceApiKey, onSuccess, onError) {
        var weatherData = {};
        var weatherServiceUrlTemplate = 'https://api.forecast.io/forecast/%s/48.630250,%209.338760?units=si';
        var weatherServiceUrl = util.format(weatherServiceUrlTemplate, weatherServiceApiKey);

        https.get(weatherServiceUrl, function (res) {
            var body = '';
            
            res.on('data', function (chunk) {
                body += chunk;
            });
            
            res.on('end', function () {
                var weatherData = JSON.parse(body);
                var adaptedWeatherData = forecastIoWeatherAdapter.convert(weatherData);
                
                onSuccess(adaptedWeatherData);
            });
        }).on('error', function (error) {
            onError(error);
        });
    };
    
    return {
        obtain: obtain
    };

}(https, forecastIoWeatherAdapter.instance);

exports.instance = forecastIoWeatherService;