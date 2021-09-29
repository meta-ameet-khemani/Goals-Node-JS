const fs = require('fs');
const http = require('http');

// create big file

// for (var i = 0; i < 10000; i++) {
//     fs.writeFileSync('./content/bigText.txt', `My Line ${i} \n`, { flag: 'a'});
// }

// reads data from big file

// console.log(fs.readFileSync('./content/bigText.txt', {encoding: 'utf-8'}));

// http.createServer((req, res) => {
//     // const text = fs.readFileSync('./content/bigText.txt', {encoding: 'utf-8'});
//     // res.end(text);
//     const fileStream = fs.createReadStream('./content/bigText.txt', 'utf-8');
//     fileStream.on('open', () => {
//         fileStream.pipe(res);
//     });
//     fileStream.on('error', (err) => {
//         res.end(err);
//     });
// }).listen(5000);

// const myStream = fs.createReadStream('./content/bigText.txt', {encoding: 'utf-8'});

// myStream.on('data', (data) => {
//     console.log(data);
// });


// OR

// read data in stream through chunks/buffer as

const myReadStream = fs.createReadStream(__dirname + '/content/bigText.txt', 'utf-8');
const myWriteStream = fs.createWriteStream(__dirname + '/content/bigText2.txt');

myReadStream.on('data', (chunk) => {
    console.log('=========== New Chunk Received ============');
    // console.log(chunk);
    myWriteStream.write(chunk);
});

// we can use PIPE also

const server = http.createServer();
server.on('request', (req, res) => {
    const myReadStream = fs.createReadStream(__dirname + '/content/bigText.txt', 'utf-8');
    myReadStream.pipe(res);
    res.end();
});

server.listen(3000, '127.0.0.1', () => {
    console.log('server is listening on 3000');
});
