/** Promise API */
/* const fs = require('node:fs/promises');

(() => new Promise((_, reject) => {
    fs.copyFile('./file.txt', 'copy_promise.txt')
    .catch(reject);
}))()
    .catch(() => {
        console.error('Error occurred while copying file:', err);
    });

(async () => {
    try {
        await fs.copyFile('./file.txt', 'copy_promise.txt');
    } catch (error) {
        console.error(error);
    }
})(); */

/** Callback API */
/* const fs = require('fs');
fs.copyFile('./file.txt', 'copied_callback.txt', (err) => {
    if(err) console.error(err);
}); */

/** Synchronous APi */
/* const fs = require('fs');
const { resolve } = require('node:path');
fs.copyFileSync('./file.txt', 'copy_sync.txt'); */



const fs = require('node:fs/promises');

(() => new Promise((_, reject) => {
    fs.copyFile('./file.txt', 'copy_promise.txt')
    .catch(reject);
}))()
    .catch(() => {
        console.error('Error occurred while copying file:', err);
    });