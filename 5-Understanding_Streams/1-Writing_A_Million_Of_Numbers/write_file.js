const fs = require('node:fs/promises');

const writeFile = async (path, content) => {
    console.time('Time');
    let fileHandle;
    try {
        fileHandle = await fs.open(path, 'w');
        await fs.writeFile(fileHandle, content.join(', '), 'utf8');
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

//////////////////////////////////////////////////////////////
/* const fs = require('node:fs/promises');

const writeFile = async (path) => {
    try {
        console.time('Time');
        const fileHandle = await fs.open(path, 'w');
        for(let i = 1; i <= 1000000; i++){
            await fileHandle.write(`${i} `)
        }
        fileHandle.close();
        console.timeEnd('Time')
    } catch (error) {
        console.log(error);
    }
}

const path = './new_file.txt';
writeFile(path); */

//////////////////////////////////////////////////////////////
/* const fs = require('node:fs');

const writeFile = async (path) => {
    console.time('Time');
    fs.open(path, 'w', (err, fd) => {
        for(let i = 1; i <= 1000000; i++ ){
            fs.writeSync(fd, `${i} `)
        }
    });
    fs.close();
    console.timeEnd('Time');
}

const path = './new_file.txt';
writeFile(path);
const fs = require('node:fs'); */

//////////////////////////////////////////////////////////////
/* const fs = require('node:fs');

const writeFile = async (path) => {
    console.time('Time');
    fs.open(path, 'w', (err, fd) => {
        for(let i = 1; i <= 1000000; i++ ){
            fs.write(fd, `${i} `, () => {})
        }
    });
    fs.close();
    console.timeEnd('Time');
}

const path = './new_file.txt';
writeFile(path); */