const net = require("node:net");

const client = net.createConnection({ host: '127.0.0.1', port: 3099},() => {

    //const buff = Buffer.from('Hello simple server. :D')
    const buff = Buffer.from('48656c6c6f2073696d706c65207365727665722e203a44', 'hex')

    client.write(buff);
})