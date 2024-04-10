const fs = require('node:fs');

fs.readFile('./text.txt', (err, data) => {
    if(err){
        console.error('Error reading file:\n', err);
        return;
    }
    console.log(data.toString('utf-8'));
})

/* const content = fs.readFileSync('./text.txt'); */

//console.log(content.toString('utf-8'));