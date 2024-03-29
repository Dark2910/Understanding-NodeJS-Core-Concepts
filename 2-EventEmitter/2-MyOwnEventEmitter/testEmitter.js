const EventEmitter =  require('./EventEmitter');

const myEventEmitter = new EventEmitter();

const c1 = (x) => {
    console.log(x);
};

myEventEmitter.on('ok', c1);
myEventEmitter.on('ok', c1);
myEventEmitter.on('ok', c1);

myEventEmitter.emit('ok', 'Hello my love.');
console.log(myEventEmitter.listenerCount('ok'));

const [x, ...x2] = myEventEmitter.rawListener('ok');
x('Hello raw listener.');

myEventEmitter.off('off', c1);
myEventEmitter.emit('off', c1); 


myEventEmitter.once('once', c1);

myEventEmitter.emit('once', 'Hello once.');
myEventEmitter.emit('once', 'Hello once.');
myEventEmitter.emit('once', 'Hello once.');
myEventEmitter.emit('once', 'Hello once.');