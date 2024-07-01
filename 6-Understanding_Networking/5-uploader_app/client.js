const net = require('node:net');
const fs = require('node:fs/promises');

const PORT = 5050;
const HOSTNAME = '::1';

const socket = net.createConnection(PORT, HOSTNAME, async () => {
    const filePath = './text.txt';
    const fileHandle = await fs.open(filePath, 'r');
    const fileReadStream = fileHandle.createReadStream({highWaterMark: Math.pow(2, 20)});

    fileReadStream.on('data', (data) => {
        if(!socket.write(data)){
            fileReadStream.pause();
        }
    });

    socket.on('drain', () => {
        fileReadStream.resume();
    });

    fileReadStream.on('end', () => {
        console.log('The file was successfully uploaded!');
        socket.end();
    });
});

