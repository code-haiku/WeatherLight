var colorSchemaComposer = require("./../../../Worker/Service/colorSchemaComposer.js");

describe("Yellow light", function () {
    it("should be turned on if the temperature is below a limit for at least one hour in the forecast", function () {
        var hourlyForecast = {
            "hourlyForecast": [
                {
                    "temperature": 12.34
                },
                {
                    "temperature": 3.2
                },
                {
                    "temperature": 8
                }
            ]
        }

        var colorSchema = colorSchemaComposer.instance.composeFrom(hourlyForecast);

        expect(colorSchema.yellow).toBe(true);
    });

    it("should be turned off if the temperature is above a limit for at least one hour in the forecast", function () {
        var hourlyForecast = {
            "hourlyForecast": [
                {
                    "temperature": 12.34
                },
                {
                    "temperature": 13.2
                },
                {
                    "temperature": 8
                }
            ]
        }
        
        var colorSchema = colorSchemaComposer.instance.composeFrom(hourlyForecast);
        
        expect(colorSchema.yellow).toBe(false);
    });
}); 