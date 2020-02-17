const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode('Los Angeles', (error, response) => {
    if (error) {
        console.log('Error', error);
    } else {
        console.log(response);
    }
});

forecast('37.8267', '111.22', (error, response) => {
    if (error) {
        console.log('Error', error);
    } else {
        console.log(response);
    }
});