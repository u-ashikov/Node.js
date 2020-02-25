const BaseController = require('./app');

class HomeController extends BaseController {
    index(req,res) {
        var model = {
            title: 'Weather Application'
        };
    
        res.render('index', model); 
    }

    about(req, res) {
        var model = {
            title: 'About Me',
            name: 'Random cat name'
        };

        return res.render('about', model);
    }

    help(req, res) {
        var model = {
            title: 'Help Page',
            message: 'Here you can find (eventually) help information.'
        }
    
        res.render('help', model);
    }
}

module.exports = new HomeController();