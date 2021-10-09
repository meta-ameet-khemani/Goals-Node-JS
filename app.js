const express = require('express');
const exp = express();

// import routes
const employeeRoute = require('./routes/employee');

// for decoding body from request
exp.use(express.urlencoded({extended: false}));

// for parsing json
exp.use(express.json());

exp.use('/employee', employeeRoute);

exp.all('*', (req, res) => {
    res.status(404).send('Page not found');
});

exp.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});