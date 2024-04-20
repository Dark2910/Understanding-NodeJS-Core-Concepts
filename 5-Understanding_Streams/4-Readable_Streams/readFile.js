const fs = require("node:fs/promises");

const readFile = async (src, des) => {
    try {
        const fileHandleRead = await fs.open(src, 'r');
        const fileHandleWrite = await fs.open(des, 'w');

        const streamRead = fileHandleRead.createReadStream({highWaterMark: Math.pow(2, 20)});
        const streamWrite = fileHandleWrite.createWriteStream({highWaterMark: Math.pow(2, 20)});

        streamRead.on('data', (chunk) => {
            if(!streamWrite.write(chunk)){
                streamRead.pause();
            }
        });

        streamWrite.on('drain', () => {
            streamRead.resume();
        });

    } catch (err) {
        console.error(err);
    }
};
const src = './src.txt';
const des = './des.txt';
readFile(src, des);