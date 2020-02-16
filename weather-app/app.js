const axios = require('axios');

var instance = axios.create({
    baseURL: 'https://api.darksky.net/forecast/68b5a5e02385b80fe158514ab506ff22'
});

instance.get('/37.8267,-122.4233')
    .then(function (response) {
        if (response) {
            var currentlyForecast = response.data.currently;
            console.log('It is currently ' + currentlyForecast.temperature + ' degrees out. There is a ' + currentlyForecast.precipProbability + '% chance of rain.');
        }
    })
    .catch(function (error) {
        console.error(error);
    });