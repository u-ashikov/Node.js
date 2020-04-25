const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const helpers = require('../utils/helpers');

const Breed = require('../models/breed');
const Cat = require('../models/cat');

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
                    var breedsOptions = breeds.map((breed) => `<option value="${breed._id}">${breed.name}</option>`);
                    html = html.toString().replace("{{breeds}}", breedsOptions.join(''));
                }

                res.write(html);
                res.end();
            }
        });
    } else if (urlPath == '/cats/add-cat' && req.method == 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();

            if (body.length > 1e6) {
                req.connection.destroy();
            }
        });

        req.on('end', async () => {
            var formData = qs.parse(body);

            var cat = new Cat({
                name: formData.name,
                description: formData.description,
                imageUrl: formData.imageUrl,
                breed: formData.breed
            });

            await cat.save();

            res.writeHead(301, {
                'Location': '/'
            });

            res.end();
        });
    } else if (urlPath == '/cats/edit-cat' && req.method == 'GET') {
        var contentType = helpers.getContentType(req.url);
        var filePath = path.normalize(path.join(__dirname, '../views/editCat.html'));

        fs.readFile(filePath, async (err, html) => {
            if (err) {
                res.writeHead('400', {
                    'Content-Type': 'text/html'
                });

                res.write('The page was not found.');
                res.end();
            } else {
                var queryParams = url.parse(req.url, true).query;
                var cat = await Cat.findOne({ _id: queryParams.id });

                if (!cat) {
                    res.writeHead('404', {
                        'Content-Type': 'text/html'
                    });

                    res.write('<h1>Cat was not found!</h1>');
                    res.end();
                } else {
                    res.writeHead('200', {
                        'Content-Type': contentType
                    });

                    html = html.toString()
                        .replace('{{id}}', cat._id)
                        .replace('{{name}}', cat.name)
                        .replace('{{description}}', cat.description)
                        .replace('{{imageUrl}}', cat.imageUrl)
                        .replace('{{breed}}', cat.breed);

                    var breeds = await Breed.find();

                    if (breeds) {
                        var breedsOptions = breeds.map((breed) => {
                            return `<option ${cat.breed == breed._id.toString() ? 'selected' : ''} value="${breed._id}">${breed.name}</option>`
                        });

                        html = html.replace("{{breeds}}", breedsOptions.join(''));
                    }

                    res.write(html);
                    res.end();
                }
            }
        });
    } else if (req.url == '/cats/edit-cat' && req.method == 'POST') {
        var contentType = helpers.getContentType(req.url);

        try {
            let body = '';

            req.on('data', function (chunk) {
                body += chunk.toString();

                if (body.length > 1e6) {
                    req.connection.destroy();
                }
            });

            req.on('end', async function () {
                var formData = qs.parse(body);

                var existingCat = await Cat.findById(formData.id);

                if (!existingCat) {
                    res.writeHead('404', {
                        'Content-Type': 'text/html'
                    });

                    res.write('<h1>Cat was not found</h1>');
                    res.end();
                } else {
                    existingCat.name = formData.name;
                    existingCat.description = formData.description;
                    existingCat.imageUrl = formData.imageUrl;
                    existingCat.breed = formData.breed;

                    await existingCat.save();

                    res.writeHead('301', {
                        'Location': '/'
                    });

                    res.end();
                }
            });
        } catch (error) {
            console.log(error);
        }
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