const http = require('http');
const hostName = '127.0.0.1';
const port = 3000;
const handlers = require('./handlers/index');

const server = http.createServer((req, res) => {
    for (var handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }
});

server.listen(port, hostName, () => {
    console.log('Server is up and running.');
});