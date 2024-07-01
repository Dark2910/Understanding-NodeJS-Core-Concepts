const net = require('node:net');
const fs = require('node:fs/promises');

const PORT = 5050;
const HOSTNAME = '::1';

const server = net.createServer(() => {});

let fileHandle, fileStream;

server.on('connection', (socket) => {
    console.log('New connection!');

    socket.on('data', async (data) => {
        fileHandle = await fs.open('./NewCarpet/test.txt', 'w');
        fileStream = fileHandle.createWriteStream({highWaterMark: Math.pow(2, 20)});
        //Writing to out destination file.
        fileStream.write(data);
    });

    socket.on('end', () => {
        console.log('Connection ended.');
        fileHandle.close();
    })
});

server.listen(PORT, HOSTNAME, ()=>{
    console.log('uploader server opened on', server.address());
});