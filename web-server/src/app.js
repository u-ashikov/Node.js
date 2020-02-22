const hbs = require('hbs');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');
app.set('views', viewsDirectory);

hbs.registerPartials(partialsDirectory);

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
        title: 'Help Page',
        message: 'Here you can find (eventually) help information.'
    }

    res.render('help', model);
});

app.get('/weather', (req, res) => {
    var query = req.query;

    if (!query.address) {
        return res.send({
            error: 'Please provide an address.'
        });
    }

    var weatherInfo = {
        location: query.address,
        forecast: 'It is currently 9 degrees.'
    };

    res.send(weatherInfo);
});

app.get('*', (req, res) => {
    var model = {
        title: '404'
    };

    res.render('not-found', model);
});

app.listen(port, () => {
    console.log('Server is up and running on port: ' + port);
});