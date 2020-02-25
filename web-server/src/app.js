const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs');
const path = require('path');
const express = require('express');
const HomeController = require('../controllers/home');

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

app.get('/weather', (req, res) => {
    var query = req.query;

    if (!query.address) {
        return res.send({
            error: 'Please provide an address.'
        });
    }

    geoCode.getCoordinates(query.address, (error, geoData) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast.get(geoData.latitude, geoData.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }

            var weatherInfo = {
                address: geoData.address,
                forecast: forecastData
            };
        
            res.send(weatherInfo);
        })
    });
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