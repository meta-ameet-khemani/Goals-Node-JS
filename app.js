const http = require('http');
const fs = require('fs');
const file = './video.mp4';

// sending video response in buffer manner
const server = http.createServer((req, res) => {
    fs.readFile(file, (err, data) => {
        if (err)
            console.log('Error in loading file ', err);
        res.writeHeader(200, { 'Content-Type' : 'video/mp4' });
        res.end(data);
    });
}).listen(3000, () => console.log('Server is listening on port 3000 ...'));

// sending video response in stream
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'video/mp4' });
//     fs.createReadStream(file).pipe(res).on('error', console.error);
// }).listen(3000, () => console.log('Server is listening on port 3000 ...'));