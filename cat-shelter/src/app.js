const http = require('http');
const hostName = '127.0.0.1';
const port = 3000;

const server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    res.write('<h1>Hello World</h1>');
    res.end();
});

server.listen(port, hostName, () => {
    console.log('Server is up and running.');
});