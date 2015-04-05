var configurationService = require("./../../Worker/Service/configurationService.js");

describe('Configuration', function () {
    it('should create a configuration object that contains all three properties with their values', function () {
        var arguments = ['deviceNumber=123456', 'hours=7', 'weatherServiceApiKey=abc'];

        var configuration = configurationService.instance.initializeFrom(arguments);
        
        expect(configuration.isValid).toBe(true);
        expect(configuration.deviceNumber).toBe('123456');
        expect(configuration.hours).toBe('7');
        expect(configuration.weatherServiceApiKey).toBe('abc');
    });

    it('should mark configuration as invalid and provide an error message in case if the weatherApiKey is missing', function () {
        var arguments = ['deviceNumber=123456', 'hours=7'];
        
        var configuration = configurationService.instance.initializeFrom(arguments);
        
        expect(configuration.isValid).toBe(false);
        expect(configuration.errors[0]).toBe('Missing configuration parameters: weatherServiceApiKey');
        expect(configuration.deviceNumber).toBe('123456');
        expect(configuration.hours).toBe('7');
    });
}); 