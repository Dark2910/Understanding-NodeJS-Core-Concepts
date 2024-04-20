const fs = require('node:fs/promises');
const { Buffer } = require('node:buffer');

/* const writeFile2 = async (path) => {
    try {
        console.time('Time');
        const fileHandle = await fs.open(path, 'w');
        const stream = fileHandle.createWriteStream();
        
        console.log(stream.writableHighWaterMark); //stream default size
        console.log(stream.writable);  //is the stream safe to write?
        console.log(stream.writableLength);
        
        //const buff = Buffer.alloc(1e+8, 255);
        const buff = Buffer.alloc(16384, 255);
        console.log(stream.write(buff)); //is it writeable?
        console.log(stream.writableLength);
                
        stream.on("drain", () => {
            console.log(stream.write(Buffer.alloc(1, "a")));
            console.log(stream.writableLength);

            console.log('We are now safe to write more!!!');
        });

        //const buff = Buffer.from("Hello. :D");
        //stream.write(buff);

        //console.log(buff);
        //console.log(stream.writableLength);

        //fileHandle.close();
        console.timeEnd('Time');
    } catch (error) {
        console.error(error);
    }
}
const path = './test.txt';
writeFile2(path); */

///////////////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @param {string} path 
 * @param {number} numberOfWrites 
 * @param {number} numberToStart 
 */
const writeFile = async (path, numberOfWrites, numberToStart) => {
    try {
        console.time('Timer');
        const fileHandle = await fs.open(path, 'w');
        const writeStream = fileHandle.createWriteStream({highWaterMark: Math.pow(2, 20)});

        let i = numberToStart;

        while (i <= numberOfWrites) {
            const buff = Buffer.from(`${i} `, "utf-8");

            if (!writeStream.write(buff)) {
                await new Promise((resolve) => writeStream.once('drain', resolve));
            };

            i++;
        };

        writeStream.end();

        writeStream.on('finish', () => {
            fileHandle.close();
            console.timeEnd('Timer');
        });
    } catch (err) {
        console.error(err);
    }
};

const path = './test.txt';
const numberOfWrites = 1e6;
const numberToStart = 1;
writeFile(path, numberOfWrites, numberToStart);
