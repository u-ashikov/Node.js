const path = require('path');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const helpers = require('../utils/helpers');

const Breed = require('../models/breed');
const Cat = require('../models/cat');

function handle(req, res) {
    var urlPath = url.parse(req.url).pathname;
    var contentType = helpers.getContentType(req.url);

    if (urlPath == '/cats/add-cat' && req.method == 'GET') {
        try {
            var filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));

            fs.readFile(filePath, 'utf-8', async (err, html) => {
                if (err) {
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });

                    res.write('The page was not found.');
                } else {
                    res.writeHead(200, {
                        'Content-Type': contentType
                    });

                    var breeds = await Breed.find();

                    if (breeds) {
                        var breedsOptions = breeds.map((breed) => `<option value="${breed._id}">${breed.name}</option>`);
                        html = html
                            .replace("{{breeds}}", breedsOptions.join(''));
                    }

                    res.write(html);
                }

                res.end();
            });
        } catch (error) {
            console.log(error);
        }
    } else if (urlPath == '/cats/add-cat' && req.method == 'POST') {
        try {
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
        } catch (error) {
            console.log(error);
        }
    } else if (urlPath == '/cats/edit-cat' && req.method == 'GET') {
        try {
            var filePath = path.normalize(path.join(__dirname, '../views/editCat.html'));

            fs.readFile(filePath, 'utf-8', async (err, html) => {
                if (err) {
                    res.writeHead('400', {
                        'Content-Type': contentType
                    });

                    res.write('The page was not found.');
                } else {
                    var queryParams = url.parse(req.url, true).query;
                    var cat = await Cat.findOne({ _id: queryParams.id });

                    if (!cat) {
                        res.writeHead('404', {
                            'Content-Type': contentType
                        });

                        res.write('<h1>Cat was not found!</h1>');
                    } else {
                        res.writeHead('200', {
                            'Content-Type': contentType
                        });

                        html = html
                            .replace(/{{id}}/g, cat._id)
                            .replace(/{{name}}/g, cat.name)
                            .replace(/{{description}}/g, cat.description)
                            .replace(/{{imageUrl}}/g, cat.imageUrl)
                            .replace(/{{breed}}/g, cat.breed);

                        var breeds = await Breed.find();

                        if (breeds) {
                            var breedsOptions = breeds.map((breed) => {
                                return `<option ${cat.breed == breed._id.toString() ? 'selected' : ''} value="${breed._id}">${breed.name}</option>`
                            });

                            html = html.replace("{{breeds}}", breedsOptions.join(''));
                        }

                        res.write(html);
                    }
                }

                res.end();
            });
        } catch (error) {
            console.log(error);
        }
    } else if (urlPath == '/cats/edit-cat' && req.method == 'POST') {
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
                        'Content-Type': contentType
                    });

                    res.write('<h1>Cat was not found</h1>');
                } else {
                    existingCat.name = formData.name;
                    existingCat.description = formData.description;
                    existingCat.imageUrl = formData.imageUrl;
                    existingCat.breed = formData.breed;

                    await existingCat.save();

                    res.writeHead('301', {
                        'Location': '/'
                    });
                }

                res.end();
            });
        } catch (error) {
            console.log(error);
        }
    } else if (urlPath == '/cats/shelter-cat' && req.method == 'GET') {
        try {
            var filePath = path.normalize(path.join(__dirname, "../views/catShelter.html"));

            fs.readFile(filePath, 'utf-8', async (err, html) => {
                if (err) {
                    res.writeHead('400', {
                        'Content-Type': contentType
                    });

                    res.write('<h1>The page was not found.</h1>');
                } else {
                    var queryString = url.parse(req.url, true).query;

                    var cat = await Cat.findById(queryString.id);

                    if (!cat) {
                        res.writeHead('404', {
                            'Content-Type': contentType
                        });

                        res.write('<h1>Cat was not found!</h1>');
                    } else {
                        await Cat.populate(cat, 'breed');

                        html = html
                            .replace(/{{id}}/g, cat._id)
                            .replace(/{{imageUrl}}/g, cat.imageUrl)
                            .replace(/{{name}}/g, cat.name)
                            .replace(/{{description}}/g, cat.description)
                            .replace(/{{breed}}/g, cat.breed.name);

                        res.writeHead('200', {
                            'Content-Type': contentType
                        });

                        res.write(html);
                    }
                }

                res.end();
            });
        } catch (error) {
            console.log(error);
        }
    } else if (urlPath == '/cats/shelter-cat' && req.method == 'POST') {
        try {
            let body = '';

            req.on('data', async function (chunk) {
                body += chunk;

                if (body.length > 1e6) {
                    req.connection.destroy();
                }
            });

            req.on('end', async function () {
                var formData = qs.parse(body);

                var cat = await Cat.findById(formData.id);

                if (!cat) {
                    res.writeHead('404', {
                        'Content-Type': contentType
                    });

                    res.write('<h1>Cat was not found!</h1>');
                } else {
                    await Cat.deleteOne({ '_id': formData.id });

                    res.writeHead('301', {
                        'Location': '/'
                    });
                }

                res.end();
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        return true;
    }
}

module.exports = handle;