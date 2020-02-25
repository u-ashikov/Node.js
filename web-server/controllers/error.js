const BaseController = require('./app');

class ErrorController extends BaseController {
    constructor() {
        super();
    }

    notFound(req, res) {
        var model = {
            title: '404'
        };
    
        res.render('not-found', model);
    }
}

module.exports = new ErrorController();