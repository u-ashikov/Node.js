const express = require('express');

const app = express();
const port = 3000;

app.get('', (req, res) => {
    res.send('<h1>Hello Express!</h1>');
});

app.get('/help', (req, res) => {
    res.send('Help page.');
});

app.get('/about', (req, res) => {
    res.send('<h3>About page.</h3>');
});

app.get('/weather', (req, res) => {
    var weatherInfo = {
        location: 'Sofia',
        forecast: 'It is currently 9 degrees.'
    };

    res.send(weatherInfo);
});

app.listen(port, () => {
    console.log('Server is up and running on port: ' + port);
});