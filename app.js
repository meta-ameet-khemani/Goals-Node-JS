const http = require('http');
const fs = require('fs');

const logo = fs.readFileSync(__dirname + '/assets/logo.svg');
const pic_trulli = fs.readFileSync(__dirname + '/assets/homepage/pic_trulli.jpg');

const homepageHTML = fs.readFileSync(__dirname + '/assets/homepage/homepage.html');
const homepageCSS = fs.readFileSync(__dirname + '/assets/homepage/homepage.css');
const homepageJS = fs.readFileSync(__dirname + '/assets/homepage/homepage.js');

http.createServer((req, res) => {

    const url = req.url;
    console.log(url);
    if (url === '/') {
        res.writeHead(200, 'OK', { 'content-type' : 'text/html' });
        res.write(homepageHTML);
        res.end();
    } else if (url === '/homepage.css') {
        res.writeHead(200, 'OK', { 'content-type' : 'text/css' });
        res.write(homepageCSS);
        res.end();
    } else if (url === '/homepage.js') {
        res.writeHead(200, 'OK', { 'content-type' : 'text/javascript' });
        res.write(homepageJS);
        res.end();
    } else if (url === '/logo.svg') {
        res.writeHead(200, 'OK', { 'content-type' : 'image/svg+xml' });
        res.write(logo);
        res.end();
    } else if (url === '/pic_trulli.jpg') {
        res.writeHead(200, 'OK', { 'content-type' : 'image/jpeg' });
        res.write(pic_trulli);
        res.end();
    } else {
        res.writeHead(404, 'Not Found', { 'content-type' : 'text/html' });
        res.write('<h1>Page Not Found</h1>');
        res.end();
    }

}).listen(3000, () => {
    console.log('Server is listening on port 3000');
});