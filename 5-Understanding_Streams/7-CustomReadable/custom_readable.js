const {Readable} = require('node:stream');
const fs = require('node:fs');

class MyReadable extends Readable {
    constructor({highWaterMark, filename}){
        super({highWaterMark})
        this.filename = filename;
        this.fd = null;
    }

    _construct(callback) {
        fs.open(this.filename, 'r', (err, fd) => {
            if(err) return callback(err)
            this.fd = fd;
            callback();
        })
    }

    _read(size) {
        const buff = Buffer.alloc(size);
        fs.read(this.fd, buff, 0, size, null, (err, bytesRead) => {
            if(err) return this.destroy(err);
            // null is to indicate the end of the stream
            this.push((bytesRead > 0) ? buff.subarray(0, bytesRead) : null)
        });
    }

    _destroy(err, callback) {
        if(this.fd){
            fs.close(this.fd, (error) => callback(error || err));
        }else {
            callback(err);
        }
    }
}

const path = './test.txt';
const readStream = new MyReadable({highWaterMark: Math.pow(2, 20), filename: path});

readStream.on('data', (chunk) => {
    console.log(chunk.toString('utf-8'));
});

readStream.on('end', () => {
    console.log('Stream is done reading.')
});