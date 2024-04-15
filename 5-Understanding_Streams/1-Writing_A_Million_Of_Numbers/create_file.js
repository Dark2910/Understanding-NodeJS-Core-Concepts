const fs = require('node:fs/promises');

const createFile = async (path, content) => {
    let fileHandle;
    
    try {
        fileHandle = await fs.open(path, 'r');
        console.log(`The file ${path} already exists.`);
    } catch (error) {
        fileHandle = await fs.open(path, 'w');
        fileHandle.writeFile(content, 'utf-8');
        console.log(`A new file was successfully created.`);
    }
    finally {
        if(fileHandle){
            fileHandle.close();
        }
    }
}

const path = './new_File.txt';
const content = '';

createFile(path, content);