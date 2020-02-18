const https = require('https');

var options = {
    hostname: 'api.darksky.net',
    path: '/forecast/68b5a5e02385b80fe158514ab506ff22/42.3601,-71.0589',
    method: 'GET'
};

const request = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk.toString();
    });

    response.on('end', () => {
        let forecastData = JSON.parse(data);
        var currentForecast = forecastData.currently;
        console.log('Current forecast: ' + currentForecast.summary + '. ' + 'It is currently ' + currentForecast.temperature + ' degrees out. There is a ' + currentForecast.precipProbability + '% chance of rain.');
    });
});

request.on('error', (error) => {
    console.log('Error', error);
})

request.end();