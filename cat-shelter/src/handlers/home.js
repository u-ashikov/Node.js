const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const Cat = require('../models/cat');

function handle(req, res) {
    var urlPath = url.parse(req.url).pathname;

    if (urlPath == '/' && req.method == 'GET') {
        try {
            var homeViewPath = path.normalize(path.join(__dirname, '../views/home/index.html'));
            var catListItemViewPath = path.normalize(path.join(__dirname, '../views/catListItem.html'));
             
            fs.readFile(homeViewPath, async (err, html) => {
                if (err) {
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
    
                    res.write('The page was not found.');
                    res.end();
                    return;
                }

                var cats = await Cat.find({}).populate('breed');

                if (!cats) {
                    html = html.toString().replace('{{cats}}', '<h1>There are no cats!</h1>');
                } else {
                    var catsItems = '';

                    cats.forEach(cat => {
                        var catItem = fs.readFileSync(catListItemViewPath, 'utf-8');

                        catItem = catItem
                                    .replace(/{{id}}/g, cat._id)
                                    .replace(/{{imageUrl}}/g, cat.imageUrl)
                                    .replace(/{{name}}/g, cat.name)
                                    .replace(/{{breed}}/g, cat.breed.name)
                                    .replace(/{{description}}/g, cat.description);

                        catsItems += catItem;
                    });

                    html = html.toString().replace('{{cats}}', catsItems);
                }
    
                res.writeHead(200, {
                    'Content-Type':'text/html'
                });
        
                res.write(html);
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