var colorSchemaComposer = function () {
    var composeFrom = function (weatherData, forecastedHours){
        var colorSchema = {
            red: false,
            yellow: false,
            green: false
        };
        
        var minimumTolerableTemperatureInDegreeCelsius = 7;
        var precipProbabilityThreshold = 0.7;
        var precipProbabilityAboveThresholdCount = 0;
        
        if (weatherData.hourlyForecast.length > forecastedHours) {
            weatherData.hourlyForecast = weatherData.hourlyForecast.slice(0, forecastedHours);
        }

        weatherData.hourlyForecast.map(function (item) {
            if (item.precipProbability > precipProbabilityThreshold) {
                precipProbabilityAboveThresholdCount++;
            }

            if ((!colorSchema.yellow) && (item.temperature < minimumTolerableTemperatureInDegreeCelsius)) {
                colorSchema.yellow = true;
            }
        });
        
        if (weatherData.hourlyForecast.length > 0) {
            if ((precipProbabilityAboveThresholdCount / weatherData.hourlyForecast.length) >= 0.5) {
                colorSchema.red = true;
            }
        }
        
        colorSchema.green = (!colorSchema.red) && (!colorSchema.yellow);
        
        return colorSchema;
    }

    return {
        composeFrom: composeFrom
    }
}();

exports.instance = colorSchemaComposer;