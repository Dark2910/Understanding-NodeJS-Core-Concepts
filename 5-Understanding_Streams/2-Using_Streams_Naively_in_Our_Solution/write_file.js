const fs = require('node:fs/promises');
const { Buffer } = require('node:buffer');

const writeFile = async (path, content) => {
    console.time('Time');
    let fileHandle;
    try {
        fileHandle = await fs.open(path, 'w');
        const stream = fileHandle.createWriteStream();
        const buff = Buffer.from(`${content.join(', ')} `, 'utf-8');
        stream.write(buff);
    } catch (error) {
        console.log(error);
    }finally{
        fileHandle.close();
        console.timeEnd('Time');
    }
}

const content = Array.from({length: 1000000}, (_, index) => index + 1);
const path = './new_file.txt'

writeFile(path, content);

////////////////////////////////////////////////////////////////////////////////////////////////////////

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