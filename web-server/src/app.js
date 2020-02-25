const hbs = require('hbs');
const path = require('path');
const express = require('express');
const HomeController = require('../controllers/home');
const WeatherController = require('../controllers/weather');

const app = express();
const port = 3000;

const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');
app.set('views', viewsDirectory);

hbs.registerPartials(partialsDirectory);

app.get('/', HomeController.index);
app.get('/about', HomeController.about);
app.get('/help', HomeController.help);
app.get('/weather', WeatherController.getByAddress);

app.get('*', (req, res) => {
    var model = {
        title: '404'
    };

    res.render('not-found', model);
});

app.listen(port, () => {
    console.log('Server is up and running on port: ' + port);
});