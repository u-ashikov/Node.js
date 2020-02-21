const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

const publicDirectory = path.join(__dirname, '../public');

app.use(express.static(publicDirectory));

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