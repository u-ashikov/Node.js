const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

const publicDirectory = path.join(__dirname, '../public');

app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

app.get('', (req, res) => {
    var model = {
        title: 'Weather Application'
    };

    res.render('index', model);
});

app.get('/about', (req, res) => {
    var model = {
        title: 'About Me',
        name: 'Random cat name'
    };

    res.render('about', model);
});

app.get('/help', (req, res) => {
    var model = {
        message: 'Here you can find (eventually) help information.'
    }

    res.render('help', model);
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