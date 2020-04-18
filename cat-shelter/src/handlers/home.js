const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

function handle(req, res) {
    var urlPath = url.parse(req.url).pathname;

    if (urlPath == '/' && req.method == 'GET') {
        try {
            var homeViewPath = path.normalize(path.join(__dirname, '../views/home/index.html'));
            fs.readFile(homeViewPath, (err, html) => {
                if (err) {
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
    
                    res.write('The page was not found.');
                    res.end();
                    return;
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