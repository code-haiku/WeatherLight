var colorSchemaComposer = require("./../../../Worker/Service/colorSchemaComposer.js");

describe("Green light", function () {
    it("should be turned on if both the red light and the yellow light are turned off", function () {
        var hourlyForecast = {
            "hourlyForecast": [
                {
                    "temperature": 25
                }
            ]
        }
        
        var colorSchema = colorSchemaComposer.instance.composeFrom(hourlyForecast);
        
        expect(colorSchema.green).toBe(true);
    });
}); 