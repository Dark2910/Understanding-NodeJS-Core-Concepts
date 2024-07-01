const net = require("node:net" );
const readline  = require("node:readline/promises")

const PORT = 3008;
//const HOSTNAME = '127.0.0.1';
const HOSTNAME = '3.145.99.116';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const clearLine = (dir) => new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
        resolve()
    });
});

const moveCursor = (dx, dy) => new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
        resolve();
    })
});

let id;

const socket = net.createConnection({port: PORT, host: HOSTNAME}, () => {
    console.log("Connected to the server!!! :D");

    const ask = async () => {
        const message = await rl.question("Enter message > ");
        // move the cursor one line up
        await moveCursor(0, -1);    
        // clear the current line that the cursor is in
        await clearLine(0);
        socket.write(`${id}-message-${message}`);
    }

    ask();

    socket.on('data', async (data) => {
        // log an empty line
        console.log();
        await moveCursor(0, -1);
        await clearLine(0);

        if(data.toString("utf-8").substring(0, 2) == 'id'){
            // When we are getting the id...
            
            // everything from the third character up until the end
            id = data.toString("utf-8").substring(3);
            console.log(`Your id is ${id}!\n`);
        } else {
            // When we are getting a message...
            console.log(data.toString("utf-8"));
        }
        
        ask();
    });
});

socket.on('end', () => {
    console.log("Connection was ended.");
});