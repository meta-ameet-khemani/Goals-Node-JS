const http = require('http');

const server = http.createServer((req, res)=>{
    if (req.url === '/') {
        res.end('Homepage');
    }
    else if (req.url === '/about') {
        // this shows that if there is any blocking code then system will halt
        // and this will affect all users
        // for (let i = 1; i < 1000; i++) {
        //     for (let j = 1; j < 1000; j++) {
        //         console.log(`${i} ${j}`);
        //     }
        // }
        res.end('About');
    }
    else {
        res.end('404 Not Found');
    }
});

server.listen(5000);
