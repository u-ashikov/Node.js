const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// TODO: Get the location input from the user.

geocode('Los Angeles', (error, geoData) => {
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