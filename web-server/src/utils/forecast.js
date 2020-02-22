const axios = require('axios');

var instance = axios.create({
    baseURL: 'https://api.darksky.net/forecast/68b5a5e02385b80fe158514ab506ff22'
});

function getForecast(latitude, longitude, callback) {
    if (!latitude || !longitude) {
        callback('Please enter valid coordinates.', undefined);
        return;
    }

    instance.get('/' + latitude + ',' + longitude)
        .then(function (response) {
            if (response) {
                var currentForecast = response.data.currently;
                callback(undefined, '' + 'It is currently ' + currentForecast.temperature + ' degrees out. There is a ' + currentForecast.precipProbability + '% chance of rain.', undefined);
            }
        })
        .catch(function (error) {
            if (!error.response) {
                callback('Unable to connect to the DarkSky API.', undefined);
            } else {
                callback(error.response.data.error, undefined);
            }
        });
}

module.exports = {
    get: getForecast
}