const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const helpers = require('../utils/helpers');

function handle(req, res) {
    var urlPath = url.parse(req.url).pathname;

    if (urlPath == '/cats/add-cat' && req.method == 'GET') {
        var contentType = helpers.getContentType(req.url);
        var filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));

        fs.readFile(filePath, (err, html) => {
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

                res.write(html);
                res.end();
            }
        });

    } else if (urlPath == '/cats/add-breed' && req.method == 'GET') {
        var contentType = helpers.getContentType(req.url);
        var filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

        fs.readFile(filePath, (err, html) => {
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

                res.write(html);
                res.end();
            }
        })
    } else {
        return true;
    }
}

module.exports = handle;