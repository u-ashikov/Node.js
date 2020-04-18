const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const helpers = require('../utils/helpers');

function handle(req,res) {
    var urlPath = url.parse(req.url).pathname;

    if (urlPath.startsWith('/content') && req.method == 'GET') {
        var contentType = helpers.getContentType(req.url);
        var staticFilePath = path.normalize(path.join(__dirname, '..' + urlPath));

        fs.readFile(staticFilePath, (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('The page was not found.');
                res.end();
                return;
            } else {
                res.writeHead(200, {
                    'Content-Type':contentType
                });

                res.write(data);
                res.end();
            }
        })
    } else {
        return true;
    }
}

module.exports = handle;