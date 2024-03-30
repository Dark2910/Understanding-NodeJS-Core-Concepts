const {Buffer} = require('node:buffer');

const myMemoryContainer = Buffer.alloc(4);


/* myMemoryContainer[0] = 0xff;
myMemoryContainer[1] = 0xab;
myMemoryContainer[2] = -34;
myMemoryContainer[3] = 0x00;

console.log(myMemoryContainer);

console.log(myMemoryContainer[0]);
console.log(myMemoryContainer[1]);
console.log(myMemoryContainer[2]);
console.log(myMemoryContainer[3]); */

myMemoryContainer[0] = 0xff;
myMemoryContainer[1] = 0xab;
myMemoryContainer.writeInt8(-34, 2);
myMemoryContainer[3] = 0x00;

console.log(myMemoryContainer);

console.log(myMemoryContainer[0]);
console.log(myMemoryContainer[1]);
console.log(myMemoryContainer.readInt8(2));
console.log(myMemoryContainer[3]);










