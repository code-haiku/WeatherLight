// converts forecast.io weather data to a data structure for further processing.
// Target data structure:
//{
//    "hourlyForecast":
//    [
//        {
//            "time": 1427464800,     // The UNIX time (that is, seconds since midnight GMT on 1 Jan 1970) at which this data point occurs.
//            "precipProbability": 0, // A numerical value between 0 and 1 (inclusive) representing the probability of precipitation occuring at the given time.
//            "temperature": 21.14,   // A numerical value representing the temperature at the given time in degrees celsium.
//        },
//        ...
//    ]
//}

var forecastIoWeatherAdapter = function () {
    var convert = function (weatherIoData) {
        var weatherData = {};
        
        weatherData.hourlyForecast = [];
        
        weatherIoData.hourly.data.map(function (item) {
            var convertedItem = convertItem(item)
            weatherData.hourlyForecast.push(convertedItem);
        });

        return weatherData;
    }
    
    var convertItem = function (item) {
        var result = {
            'time': item.time,
            'precipProbability': item.precipProbability,
            'temperature': item.temperature
        };

        return result;
    }

    return{
        convert: convert
    };
}();

exports.instance = forecastIoWeatherAdapter;