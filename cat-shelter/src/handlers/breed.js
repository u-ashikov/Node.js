const path = require('path');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const helpers = require('../utils/helpers');

const Breed = require('../models/breed');

function handle(req, res) {
    var urlPath = url.parse(req.url).pathname;
    var contentType = helpers.getContentType(req.url);

    if (urlPath == '/breeds/add-breed' && req.method == 'GET') {
        try {
            var filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

            fs.readFile(filePath, (err, html) => {
                if (err) {
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });

                    res.write('The page was not found.');
                } else {
                    res.writeHead(200, {
                        'Content-Type': contentType
                    });

                    res.write(html);
                }

                res.end();
            });
        } catch (error) {
            console.log(error);
        }
    } else if (urlPath == '/breeds/add-breed' && req.method == 'POST') {
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