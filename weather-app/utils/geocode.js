const axios = require('axios');

var instance = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
});

function getGeoCoordinates(location, callback) {
    instance.get(encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoieWFzaGlrb3YiLCJhIjoiY2s2cGYwN253MHRpMzNlcXA5ZndoaTZyZyJ9._HVCLkxwuAOPDAq5liXKKA')
        .then((response) => {
            var geoData = response.data;

            if (geoData && geoData.features.length > 0) {
                var coordinates = geoData.features[0];
                
                callback(undefined, {
                    address: coordinates.place_name,
                    longitude: coordinates.center[0],
                    latitude: coordinates.center[1]
                })
            } else {
                callback(undefined, 'Place not found!');
            }
        })
        .catch((error) => {
            if (!error.response) {
                callback('Unable to connect to the MaxBox API.', undefined);
            } else {
                callback(error.response.data.message, undefined);
            }
        });
}

module.exports = getGeoCoordinates;