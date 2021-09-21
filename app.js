const http = require('http');
const { readFileSync } = require('fs');

const aboutPage = readFileSync('./pages/about.html');
const trulliImage = readFileSync('./pages/pic_trulli.jpg');

const server = http.createServer((req, res) => {
    console.log(req.url);
    // res.statusCode = 200;
    // res.setHeader('content-type', 'text/plain');
    // // res.end('Hello);
    // res.write('Hello');
    // res.end();
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/html');
        res.end('<center><h1>Homepage</h1></center>');
    } else if (req.url === '/about') {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/html');
        res.end(aboutPage);
    } else if (req.url === '/pic_trulli.jpg') {
        res.statusCode = 200;
        res.setHeader('content-type', 'image/jpeg');
        res.end(trulliImage);
    } else {
        res.statusCode = 404;
        res.setHeader('content-type', 'text/html');
        res.end('Page not found');
    }
});

server.listen(5000, ()=>{
    console.log('Server is listening on port 5000');
});
