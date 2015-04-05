var colorSchemaComposer = require("./../../../Worker/Service/colorSchemaComposer.js");

describe("Red light", function () {
    it("should be turned on if the rain probability is above 70% for more than a 50% of hourly forecasts", function () {
        var hourlyForecast = {
            "hourlyForecast": [
                {
                    "precipProbability": 0.8
                },
                {
                    "precipProbability": 0.9
                },
                {
                    "precipProbability": 0.1
                }
            ]
        }
        
        var colorSchema = colorSchemaComposer.instance.composeFrom(hourlyForecast);
        
        expect(colorSchema.red).toBe(true);
    });
}); 