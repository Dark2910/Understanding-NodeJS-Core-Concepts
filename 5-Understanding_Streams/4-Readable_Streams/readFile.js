const fs = require("node:fs/promises");

/* const readFile = async (src, des) => {
    try {
        const fileHandleRead = await fs.open(src, 'r');
        const fileHandleWrite = await fs.open(des, 'w');

        const streamRead = fileHandleRead.createReadStream({highWaterMark: Math.pow(2, 20)});
        const streamWrite = fileHandleWrite.createWriteStream({highWaterMark: Math.pow(2, 20)});

        streamRead.on('data', (chunk) => {
            if(!streamWrite.write(chunk)){
                streamRead.pause();
            }
        });

        streamWrite.on('drain', () => {
            streamRead.resume();
        });

    } catch (err) {
        console.error(err);
    }
};
const src = './numbers.txt';
const des = './numbersCopy.txt';
readFile(src, des); */

const readFile = async (src, des) => {
    try {
        console.time('Timer');
        
        const fileHandleRead = await fs.open(src, 'r');
        const fileHandleWrite = await fs.open(des, 'w');
        
        const streamRead = fileHandleRead.createReadStream({highWaterMark: Math.pow(2, 20)});
        const streamWrite = fileHandleWrite.createWriteStream({highWaterMark: Math.pow(2, 20)});
        
        let split = '';
        
        streamRead.on('data', (chunk) => {
            const numbers = chunk.toString('utf-8').split(' ');
            
            if(Number( numbers[0]) !== Number(numbers[1]) -1) {
                if(split) {
                    numbers[0] = split.trim() + numbers[0].trim();
                };
            };
            
            if(Number(numbers[numbers.length -2]) +1 !== Number(numbers[numbers.length -1])) {
                split = numbers.pop();
            };
            
            numbers.forEach((number) => {
                const n = Number(number);
                if(n % 2 === 0){
                    if(!streamWrite.write(`${n} `)){
                        streamRead.pause();
                    };
                };
            });
        });
        
        streamWrite.on('drain', () => {
            streamRead.resume();
        });
        
        streamRead.on('end', () => {
            console.log('Done reading.');
            console.timeEnd('Timer');
        });
    } catch (err) {
        console.error(err);
    }
};

const src = './numbers.txt';
const des = './oddNumbers.txt';
readFile(src, des);