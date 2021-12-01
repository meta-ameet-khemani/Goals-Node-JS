const { createReadStream, createWriteStream } = require('fs');

const writeStream = createWriteStream('./pipedText.txt');

// this will automatically handle all events including backpressure in streams to transfer data bit by bit
process.stdin.pipe(writeStream);

// if we do like
// echo "Hello World" | ./4_pipe.js

// or 
// cat .\3_backpressure.js | ./4_pipe.js

// the both above command will trasfer (through pipe) data to writable stream i.e console