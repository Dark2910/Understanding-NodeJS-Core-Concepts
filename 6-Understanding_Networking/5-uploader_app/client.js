const net = require('node:net');
const fs = require('node:fs/promises');

const PORT = 5050;
const HOSTNAME = '::1';

const socket = net.createConnection(PORT, HOSTNAME, async () => {
    const filePath = './text.txt';
    const fileHandle = await fs.open(filePath, 'r');
    const fileStream = fileHandle.createReadStream({highWaterMark: Math.pow(2, 20)});

    fileStream.on('data', (data) => {
        socket.write(data);
    });

    fileStream.on('end', () => {
        console.log('The file was successfully uploaded!');
        socket.end();
    });
});

