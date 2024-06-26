const http = require('node:http');

const PORT = 4080;
const HOSTNAME = '192.168.0.123';

const server = http.createServer((req, res) => {
    const data = {message: 'Hi :D'};

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Connection', 'close');
    res.statusCode = 200;

    res.end(JSON.stringify(data));
})


server.listen(PORT, HOSTNAME, () => {
    console.log('Server listening...', server.address());
})