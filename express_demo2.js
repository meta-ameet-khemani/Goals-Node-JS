// how to pass different types of files in express framework

const express = require('express');
const path = require('path');

const exp = express();

exp.use(express.static(__dirname + '/assets'));
exp.use(express.static(__dirname + '/assets/index'));
// exp.use(express.static(__dirname + '/assets/homepage'));

// exp.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname + '/assets/homepage/homepage.html'));
// });

exp.get('/about', (req, res) => {
    res.status(200).send('<h1>About</h1');
});

exp.get('*', (req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});

exp.listen(3000, () => {
    console.log('Server is listening on port 3000');
});