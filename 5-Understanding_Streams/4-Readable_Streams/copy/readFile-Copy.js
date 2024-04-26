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
        
        const destFile = await fs.open('./text.txt', 'w');
        const srcFile = await fs.open('../numbers.txt', 'r');
        
        let bytesRead = -1;
        
        while(bytesRead !== 0) {
            const readResult = await srcFile.read();
            bytesRead = readResult.bytesRead;
            

            if(bytesRead !== 16384) {
                const indexOfNotFilled = readResult.buffer.indexOf(0);
                const newBuff = Buffer.alloc(indexOfNotFilled);

                readResult.buffer.copy(newBuff, 0, 0, indexOfNotFilled);

                destFile.write(newBuff);
            } else {
                destFile.write(readResult.buffer);
            }
        }

        console.timeEnd('Copy');
    } catch (err) {
        console.error(err);
    }
})();