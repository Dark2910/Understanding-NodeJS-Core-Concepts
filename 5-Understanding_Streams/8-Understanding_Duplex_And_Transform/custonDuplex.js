const { Duplex } = require('node:stream');
const fs = require('node:fs');

class MyDuplex extends Duplex {
    constructor({
        readableHighWaterMark, 
        writableHighWaterMark, 
        readFilename, 
        writeFilename
    }){
        super({readableHighWaterMark, writableHighWaterMark});
        this.readFilename = readFilename;
        this.writeFilename = writeFilename;
        this.readFd = null;
        this.writeFd = null;
        this.chunks = [];
        this.chunksSize = 0;
    }

    _construct(callback){
        fs.open(this.readFilename, 'r', (err, readFd) => {
            if(err) return callback(err)

            this.readFd = readFd;

            fs.open(this.writeFilename, 'w', (err, writeFd) => {
                if(err) return callback(err);
                
                this.writeFd = writeFd;
                return callback();
            });

        });
    }

    _read(size){
        const buff = Buffer.alloc(size);
        fs.read(this.readFd, buff, 0, size, null, (err, bytesRead) => {
            if(err) return this.destroy(err);
            this.push( (bytesRead > 0)? buff.subarray(0, bytesRead) : null );
        });
    }

    _write(chunk, encoding, callback){
        this.chunks.push(chunk);
        this.chunksSize += chunk.length;

        if(this.chunksSize > this.writableHighWaterMark) {
            fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
                if(err) return callback(err);
                this.chunks = [];
                this.chunksSize = 0;
            });
        }
        return callback();
    }

    _final(callback){
        fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
            if(err) return callback(err);
            this.chunks = [];
            return callback();
        });
    }

    _destroy(err, callback){
        if(this.writeFd) {
            fs.close(this.writeFd, (error) => callback( error || err ))
        } else {
            return callback(err);
        }
    }
}

const duplex = new MyDuplex({
    readFilename: 'test2.txt',
    writeFilename: 'test.txt'
})

duplex.write(Buffer.from('Hello!!! :D'));
duplex.end();

duplex.on('data', (chunk) => {
    console.log(chunk.toString("utf-8"));
})
