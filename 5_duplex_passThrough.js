const { PassThrough } = require('stream');
const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('./video.mp4');
const writeStream = createWriteStream('./copy2.mp4');

// creating duplex stream
// which can both read and write at the same time
// this can work like, get data from source, apply some logic before writing it
const passThrough = new PassThrough();

// we do get events also on this passThrough duplex (middleware pipe)
let totalBytesTransfered = 0;
passThrough.on('data', (chunk) => {
    totalBytesTransfered += chunk.length;
    console.log('Data transfered (MB): ', (totalBytesTransfered * 0.000001));
});

readStream.pipe(passThrough).pipe(writeStream);
