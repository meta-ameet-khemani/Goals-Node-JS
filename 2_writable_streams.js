const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('./video.mp4');
const writeStream = createWriteStream('./copy.mp4');

readStream.on('data', (chunk) => {
    // console.log(chunk.length);
    writeStream.write(chunk);
});

readStream.on('end', () => {
    // console.log('Finished');
    writeStream.end();
});

readStream.on('err', (err) => {
    console.log('Error: ', console.error);
});

writeStream.on('close', () => console.log('Data Copied'));
