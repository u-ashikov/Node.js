const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

var location = process.argv[2];

if (!location) {
    return console.log('Invalid location!');
}

geocode(location, (error, geoData) => {
    if (error) {
        return console.log('Error', error);
    } 

    forecast(geoData.latitude, geoData.longitude, (error, forecastInfo) => {
        if (error) {
            return console.log('Error', error);
        }

        console.log(geoData.address + '. ' + forecastInfo);
    });
});