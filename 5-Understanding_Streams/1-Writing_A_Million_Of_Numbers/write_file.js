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
const path = './new_File.txt'

writeFile(path, content);

