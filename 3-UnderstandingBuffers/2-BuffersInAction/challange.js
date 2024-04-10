const {Buffer} = require('buffer');

const myMemoryContainer = Buffer.alloc(4);

myMemoryContainer[0] = 0x4C;
myMemoryContainer[1] = 0x41;
myMemoryContainer[2] = 0x4C;
myMemoryContainer[3] = 0x4F;

/* console.log(myMemoryContainer);

console.log(myMemoryContainer[0]);
console.log(myMemoryContainer[1]);
console.log(myMemoryContainer[2]);
console.log(myMemoryContainer[3]);

console.log(myMemoryContainer.toString('utf-8', 0, 4)); */

////////////////////////////////////////////////////////////////////////////

const myBuffer = Buffer.alloc(3)

myBuffer.writeInt8(0b01001000, 0);
myBuffer.writeInt8(0x69, 1);
myBuffer.writeInt8(33, 2);

/* console.log(myBuffer.toString('utf-8'));
console.log(myBuffer.toString('utf-16le')); */

////////////////////////////////////////////////////////////////////////////

/* const myBuffer1 = Buffer.from([0x48, 0x69, 0x21]);
console.log(myBuffer1.toString('utf-8')); */

/* const myBuffer1 = Buffer.from('486921', 'hex');
console.log(myBuffer1.toString('utf-8')); */

const myBuffer1 = Buffer.from('Lalo. :D', 'utf-8');
console.log(myBuffer1);
console.log(myBuffer1.toString('utf-8'));

const symblBuffer = Buffer.from('F09FAAB2', 'hex');
console.log(symblBuffer.toString('utf-8'));


