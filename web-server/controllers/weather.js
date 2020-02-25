const geoCode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');
const BaseController = require('./app');

class WeatherController extends BaseController {
    constructor() {
        super();
    }

    getByAddress(req, res) {
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
    }
}

module.exports = new WeatherController();