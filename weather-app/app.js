const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode('Los Angeles', (error, geoData) => {
    if (error) {
        console.log('Error', error);
        return;
    } 

    forecast(geoData.latitude, geoData.longitude, (error, forecastInfo) => {
        if (error) {
            console.log('Error', error);
        } else {
            console.log(geoData.address + '. ' + forecastInfo);
        }
    });
});