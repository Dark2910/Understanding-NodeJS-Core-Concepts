const EventEmitter = require('node:events');

class Emitter extends EventEmitter {};

const myE = new Emitter();  

myE.on('Hi', () => {
    console.log('An event occurred 2.');
});
myE.on('Hi', () => {
    console.log('An event occurred 1.');
});
myE.on('Hi', (x) => {
    console.log('An event with parameter occurred.');
    console.log(x);
});

myE.on('bar', () => {
    console.log('An bar event ocurred.')    
})

myE.once('once', () => {
    console.log('One time.');
})

myE.emit('Hi');
myE.emit('Hi', 'Some text');

myE.emit('bar');

myE.emit('once');
myE.emit('once');
myE.emit('once');
myE.emit('once');