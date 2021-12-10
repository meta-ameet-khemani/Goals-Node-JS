const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<center><h1>Hello All !!!</h1></center>');
});

app.get('/contact', (req, res) => {
    res.send('<center><h3>Under Construction</h3></center>');
});

app.listen(3000, () => {
    console.log('Listening to port 3000...');
})