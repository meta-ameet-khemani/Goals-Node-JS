const { Duplex, PassThrough } = require('stream');
const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('./video.mp4');
const writeStream = createWriteStream('./copy3.mp4');

class Throttle extends Duplex {
    constructor(delayedTime) {
        super();
        this.delay = delayedTime;
    }

    _read() {

    }

    _write(chunk, encoding, callback) {
        this.push(chunk);
        setTimeout(callback, this.delay);
    }

    _final() {
        this.push(null);
    }
}

const myThrottle = new Throttle(100);
const passThrough = new PassThrough();

let totalBytesTransfered = 0;
passThrough.on('data', (chunk) => {
    totalBytesTransfered += chunk.length;
    console.log('Data transfered (MB): ', (totalBytesTransfered * 0.000001));
});

// readStream.pipe(myThrottle).pipe(passThrough).pipe(writeStream);
readStream.pipe(passThrough).pipe(writeStream);
