const axios = require('axios');

var instance = axios.create({
    baseURL: 'https://api.darksky.net/forecast/68b5a5e02385b80fe158514ab506ff22'
});

instance.get('/37.8267, 111.22')
    .then(function (response) {
        if (response) {
            var currentlyForecast = response.data.currently;
            console.log('It is currently ' + currentlyForecast.temperature + ' degrees out. There is a ' + currentlyForecast.precipProbability + '% chance of rain.');
        }
    })
    .catch(function (error) {
        if (!error.response) {
            console.log('Unable to connect to the DarkSky API.');
        } else {
            console.log(error.response.data.error);
        }
    });

instance.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles1111.json?access_token=pk.eyJ1IjoieWFzaGlrb3YiLCJhIjoiY2s2cGYwN253MHRpMzNlcXA5ZndoaTZyZyJ9._HVCLkxwuAOPDAq5liXKKA')
    .then(function (response) {
        var geoData = response.data;

        if (geoData && geoData.features.length > 0) {
            var coordinates = geoData.features[0];
            console.log(coordinates.place_name + ', Longitude: ' + coordinates.center[0] + ', Latitude: ' + coordinates.center[1]);
        } else {
            console.log('Place not found!');
        }
    })
    .catch(function (error) {
        if (!error.response) {
            console.log('Unable to connect to the MaxBox API.');
        } else {
            console.log(error.response.data.message);
        }
    })