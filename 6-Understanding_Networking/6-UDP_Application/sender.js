const dgram = require('node:dgram');

const PORT = 4080;
const HOSTNAME = '127.0.0.1';

const sender = dgram.createSocket('udp4');

const messageBuff = Buffer.from('Hi, this is a UDP message');

sender.send([messageBuff], PORT, HOSTNAME, (err, bytes) => {
    if(err) console.log(err);
    console.log(bytes);
    sender.close();
});


