// const gzip = require('zlib').createGzip();
// const fs = require('fs');

// const source = fs.createReadStream('./jdk.mp4');
// const destination = fs.createWriteStream('./jdk.mp4.gz');

// source.pipe(gzip).pipe(destination);

// using pipeline function

// const { pipeline } = require('stream');
// const zlib = require('zlib');
// const fs = require('fs');

// pipeline(
//     fs.createReadStream('./jdk.mp4'),
//     zlib.createGzip(),
//     fs.createWriteStream('./jdk.mp4.gz'),
//     (err) => {
//         if (err) {
//             console.error('Pipeline failed', err);
//         } else {
//             console.log('Pipeline succeeded');
//         }
//     }
// );


// asynchronous way

const stream = require('stream');
const fs = require('fs');
const zlib = require('zlib');
const util = require('util');

const pipeline = util.promisify(stream.pipeline);

async function compress() {
    try {
        await pipeline(
            fs.createReadStream('./jdk.mp4'),
            zlib.createGzip(),
            fs.createWriteStream('./jdk.mp4.gz')
        );
        console.log('Compressed successfully');
        console.log((new Date()).toLocaleTimeString());
    } catch (err) {
        console.log('Error in compressing data: ', err);
    }
}

console.log((new Date()).toLocaleTimeString());
compress();