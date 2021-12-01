const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('./video.mp4');

const writeStream = createWriteStream('./copy.mp4', { highWaterMark: 123 });

readStream.on('data', (chunk) => {
    // console.log(chunk.length);
    const result = writeStream.write(chunk);
    if (!result) {
        console.log('backpressure');
        readStream.pause();
    }
});

readStream.on('end', () => {
    // console.log('Finished');
    writeStream.end();
});

readStream.on('err', (err) => {
    console.log('Error: ', console.error);
});

writeStream.on('close', () => console.log('Data Copied'));

writeStream.on('drain', () => {
    console.log('Drained');
    readStream.resume();
});
