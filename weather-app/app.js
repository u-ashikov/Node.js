const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

var location = process.argv[2];

if (!location) {
    return console.log('Invalid location!');
}

geocode(location, (error, { latitude, longitude, address}) => {
    if (error) {
        return console.log('Error', error);
    } 

    forecast(latitude, longitude, (error, forecastInfo) => {
        if (error) {
            return console.log('Error', error);
        }

        console.log(address + '. ' + forecastInfo);
    });
});