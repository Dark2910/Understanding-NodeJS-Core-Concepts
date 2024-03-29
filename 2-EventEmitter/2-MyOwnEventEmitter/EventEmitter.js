class EventEmitter {
    listeners  = {}; 

    addListeners(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(fn);
        return this;
    };
    on(eventName, fn) {
        return this.addListeners(eventName, fn);
    };

    once(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        const onceWrapper = (...arg) => {
            fn(...arg);
            this.off(eventName, onceWrapper);
        }
        this.listeners[eventName].push(onceWrapper);
        return this;
    };

    removeListener(eventName, fn) {
        let fns = this.listeners[eventName];
        if (!fns) return this;
        for(let i = fns.length - 1; i >= 0; i--) {
            if(fns[i] === fn){
                fns.splice(i,1);
            }
        }
        return this;
    };
    off(eventName, fn) {
        return this.removeListener(eventName, fn);
    };

    emit(eventName, ...arg) {
        let fns = this.listeners[eventName];
        if (!fns) return false;
        fns.forEach(fn => {
            fn(...arg);
        });
        return true;
    };

    listenerCount(eventName) {
        let fns = this.listeners[eventName] || [];
        return fns.length;
    };

    rawListener(eventName) {
        return this.listeners[eventName];
    };
}

module.exports = EventEmitter;