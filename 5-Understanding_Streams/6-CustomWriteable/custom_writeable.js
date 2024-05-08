const { Writable } = require('node:stream');
const fs = require('node:fs');

class MyWriteable extends Writable {
    constructor({highWaterMark, filename}){
        super({highWaterMark})

        this.filename = filename;
        this.fd = null;
        this.chunks = [];
        this.chunksSize = 0;
        this.writesCount = 0;
    }

    // This will run after the constructor, and it will put off all calling the other methods until we call the callback function
    _construct(callback){
        fs.open(this.filename, 'w', (err, fd) => {
            if(err){
                // So if we call the callback with an argument, it means that we have an error and we should not proceed
                callback(err);
            } else {
                this.fd = fd;
                // No arguments means it was successful
                callback();
            }
        });
    }

    _write(chunk, encoding, callback){
        this.chunks.push(chunk);
        this.chunksSize += chunk.length;

        if(this.chunksSize > this.writableHighWaterMark) {
            fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
                if(err){
                    return callback(err)
                }
                this.chunks = [];
                this.chunksSize = 0;
                ++this.writesCount;
                callback();
            });
        } else {
            callback();
        }
    }

    _final(callback){
        fs.write(this.fd, Buffer.concat(this.chunks), (err)=>{
            if(err) {
                return (callback(err));
            }
            this.chunks = [];
            callback();
        });
    }

    _destroy(){

    }
}

const stream = new MyWriteable({highWaterMark: Math.pow(2, 20), filename: './test.txt'})

stream.write(Buffer.from('Hello World!!! :D'));
stream.end(Buffer.from('Hello my friend. :D'));