const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    req.on('error', (error) => {
        console.log(error);
        res.statusCode = 400;
        res.end();
        // res.end(400);
    });
    res.on('error', (error) => {
        console.log(error);
    });
    const { headers, url, method } = req;
    console.log(headers);
    console.log(url);
    console.log(method);
    if (method === 'GET' && url === '/') {
        req.pipe(res);
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
