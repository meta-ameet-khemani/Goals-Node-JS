// how to use express
// simple sample code, alternative to http package

const express = require('express');

const exp = express();

// const exp = require('express')();

exp.get('/', (req, res) => {
    res.status(200).send('<h1>Homepage</h1>');
});

exp.get('/about', (req, res) => {
    res.status(200).send('<h1>About</h1>');
});

exp.get('*', (req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});

exp.listen(3000, () => {
    console.log('Server is listening on port 3000');
});