const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const helpers = require('../utils/helpers');

const Breed = require('../models/breed');

function handle(req, res) {
    var urlPath = url.parse(req.url).pathname;

    if (urlPath == '/cats/add-cat' && req.method == 'GET') {
        var contentType = helpers.getContentType(req.url);
        var filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));

        fs.readFile(filePath, async (err, html) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('The page was not found.');
                res.end();
                return;
            } else {
                res.writeHead(200, {
                    'Content-Type': contentType
                });

                var breeds = await Breed.find();
                
                if (breeds) {
                    var breedsOptions = breeds.map((breed) => `<option value="${breed.name}">${breed.name}</option>`);
                    html = html.toString().replace("{{breeds}}", breedsOptions.join(''));
                }

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
                    'Content-Type': contentType
                });

                res.write(html);
                res.end();
            }
        })
    } else if (urlPath == '/cats/add-breed' && req.method == 'POST') {
        var contentType = helpers.getContentType(req.url);

        let body = '';
        req.on('data', function (chunk) {
            body += chunk.toString();

            if (body.length > 1e6) {
                req.connection.destroy();
            }
        });

        req.on('end', async function () {
            try {
                var formData = qs.parse(body);

                var catBreed = new Breed({ name: formData.breed });

                await catBreed.save();

                res.writeHead(301, {
                    'Location': '/'
                });

                res.end();
            } catch (error) {
                res.writeHead(400);
                res.end('Bad Request.');
            }
        });
    } else {
        return true;
    }
}

module.exports = handle;