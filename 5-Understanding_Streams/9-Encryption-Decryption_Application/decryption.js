const { Transform, pipeline } = require("node:stream");
const fs = require("node:fs/promises"); 

class Encrypt extends Transform {
    _transform( chunk, encoding, callback) {
        for(let i = 0 ;  i < chunk.length ; i++){
            if(chunk[i] !== 255){
                chunk[i] = chunk[i] - 1;
            } 
        }
        callback(null, chunk);
    }
}

(async () => {
    const readFile = await fs.open('./write.txt', 'r');
    const writeFile = await fs.open('./read.txt', 'w');

    const readStream = readFile.createReadStream();
    const writeStream = writeFile.createWriteStream();

    const encrypt = new Encrypt();

    pipeline(readStream, encrypt, writeStream, (err) => {
        if(err) {
            console.log(`Pipeline failed, ${err}`);
        } else {
            console.log('Pipeline succeeded.');
        }
    })
})()