const fs = require('node:fs/promises');

/* (async () => {
    try {
        const destFile = await fs.open('./textCopy.txt', 'w');
        const result = await fs.readFile('../numbers.txt');

        await destFile.write(result);
    } catch (err) {
        console.error(err);
    }
})(); */

(async () => {
    try {
        console.time('Copy');
        
        const srcFile = await fs.open('../numbers.txt', 'r');
        const destFile = await fs.open('./text.txt', 'w');
        
        let bytesRead = -1;

        while(bytesRead !== 0) {
            const readResult = await srcFile.read();
            let buff = readResult.buffer;
            bytesRead = readResult.bytesRead;

            if(bytesRead !== 16384) {
                const indexOfNotFilled = readResult.buffer.indexOf(0);
                buff = Buffer.alloc(indexOfNotFilled);

                readResult.buffer.copy(buff, 0, 0, indexOfNotFilled);
            }
            
            await destFile.write(buff);
        }

        console.timeEnd('Copy');
    } catch (err) {
        console.error(err);
    }
})();