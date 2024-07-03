const dgram = require('node:dgram');

const PORT = 4080;
const HOSTNAME = '127.0.0.1';

const receiver = dgram.createSocket('udp4');

receiver.on('error', (err) => {
    console.log(`Server error:\n${err.stack}`);
    receiver.close();
});

receiver.on('message', (message, remoteInfo) => {
    console.log(`server got: ${message} from ${remoteInfo.address}:${remoteInfo.port}`);
});

receiver.on('listening', () => {
    const address = receiver.address();
    console.log(`Server listening ${address.address}:${address.port}`);
});

receiver.bind({address: HOSTNAME, port: PORT});