const EventEmitter = require('node:events');
const myEmitter =  new EventEmitter();

//Example_1 - Create an event emitter instance and register a couple of callbacks
function c1 () {
    console.log('An event ocurred.');
}
function c2 () {
    console.log('Yet another event ocurred.');
}

myEmitter.on('eventOne', c1);
myEmitter.on('eventOne', c2);

myEmitter.emit('eventOne');

////////////////////////////////////////////////////////

//Example_2 - Registering for the event to be fired only one time using once
const c1 = (x) => {
    console.log(x);
};

myEmitter.once('eventOnce', c1);

myEmitter.emit('eventOnce', 'EventOnce once fire.');
myEmitter.emit('eventOnce', 'EventOnce once fire.');
myEmitter.emit('eventOnce', 'EventOnce once fire.');

////////////////////////////////////////////////////////

//Example_3 - Registering for the event with callback parameters
const c1 = (x, y) => {
    console.log(x, y);
}

myEmitter.on('ok', c1)

myEmitter.emit('ok', 'Hello there.', ':D')

////////////////////////////////////////////////////////

//Example_4 - Unregister events
const c1 = (x) => {
    console.log(x);
}

myEmitter.off('off', c1);

myEmitter.emit('off', 'Hello Off.');

////////////////////////////////////////////////////////

//Example_5 - Getting listener count
const c1 = (x) => {
    console.log(x);
}

myEmitter.on('ok', c1);
myEmitter.on('ok', c1);
myEmitter.on('ok', c1);

console.log(myEmitter.listenerCount('ok'));

////////////////////////////////////////////////////////

//Example_6 - Getting raw listeners
const c1 = (x) => {
    console.log(x);
}

myEmitter.on('ok', c1);
myEmitter.on('ok', c1);
myEmitter.on('ok', c1);

const [x1, x2, x3] = myEmitter.rawListeners('ok')

x1('Hello');
x2('Is me');
x3(':D')

myEmitter.emit('ok', 'UwU');

////////////////////////////////////////////////////////