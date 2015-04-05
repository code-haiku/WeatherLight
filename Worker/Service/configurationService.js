var configurationService = function () {
    var configuration;
    var argumentKeyValueSeparator = '=';
    var configurationKeysWhiteList = ['deviceNumber' ,'hours', 'weatherServiceApiKey'];

    var takeOverToConfiguration = function (keyValueArray){
        if (configurationKeysWhiteList.indexOf(keyValueArray[0]) > -1) {
            configuration[keyValueArray[0]] = keyValueArray[1];
        }
    }
    
    var addValidationError = function (propertyName) {
        configuration.errors.push('Missing configuration parameters: ' + propertyName);
    }

    var validateConfiguration = function () {
        configuration.isValid = true;
        configuration.errors = [];
        
        if (!configuration.hasOwnProperty('weatherServiceApiKey')) {
            configuration.isValid = false;
            addValidationError('weatherServiceApiKey');
        }
    }

    var initializeFrom = function (argumentsArray) {
        configuration = {};

        argumentsArray.map(function (argument) {
            var splittedArgument = argument.split(argumentKeyValueSeparator);
            takeOverToConfiguration(splittedArgument);
        });
        
        validateConfiguration();

        return configuration;
    }

    return {
        initializeFrom: initializeFrom
    }
}();

exports.instance = configurationService;