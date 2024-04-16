const fs = require('node:fs/promises');
const { Buffer } = require('node:buffer');

/* const writeFile2 = async (path) => {
    try {
        console.time('Time');
        const fileHandle = await fs.open(path, 'w');
        const stream = fileHandle.createWriteStream();
        
        for(let i = 1; i <= 1000000; i++) {
            const buff = Buffer.from(`${i} `, 'utf-8');
            stream.write(buff);
        }
        console.timeEnd('Time');
    } catch (error) {
        console.error(error);
    }
}

const path2 = './test.txt';
writeFile2(path2); */

/////////////////////////////////////////////////////////////////////////////////

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
writeFile2(path);
 */

const writeFile2 = async (path) => {
    try {
        console.time('Time');

        const fileHandle = await fs.open(path, 'w');
        const stream = fileHandle.createWriteStream();

        let i = 1;
        const numberOfWrites = 1000000;

        const writeMany = () => {
            while( i <= numberOfWrites ) {
                const buff = Buffer.from(`${i} `, "utf-8");

                if(i === numberOfWrites) {
                    return stream.end(buff);
                }

                if(!stream.write(buff)) {
                    break;
                }

                i++;
            }
        }

        writeMany();

        stream.on('drain', () => {
            writeMany();
        });

        stream.on('finish', () => {
            fileHandle.close();
            console.timeEnd('Time');
        });
        
    } catch (error) {
        console.error(error);
    }
}
const path = './test.txt';
writeFile2(path);