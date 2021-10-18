// use of morgan package as logger in express

const express = require('express');
const exp = express();
const { products } = require('./data/test_data');
const morgan = require('morgan');

const stylus = require('stylus');
const nib = require('nib');

exp.use(express.urlencoded({extended: false}));

// logging the incoming requests
exp.use(morgan('tiny'));

// directives for using jade template engine
exp.set('views', __dirname + '/views');
exp.set('view engine', 'jade');

// middleware for stylus
exp.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
    // compile: (str, path) => {
    //     return stylus(str).set('filename', path).use(nib())
    // }
}));

function compile(str, path) {
return stylus(str)
    .set('filename', path)
    .use(nib());
}

exp.use(express.static(__dirname + '/public'));

// GET /products 304 - - 6.344 ms

// exp.use(morgan('combined'));
// ::1 - - [06/Oct/2021:13:46:53 +0000] "GET /products HTTP/1.1" 304 - "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36"

// exp.use(morgan('common'));
// ::1 - - [06/Oct/2021:13:48:06 +0000] "GET /products HTTP/1.1" 304 -

// exp.use(morgan('dev'));
// GET /products 304 4.322 ms - -

// exp.use(morgan('short'));
// ::1 - GET /products HTTP/1.1 304 - - 5.189 ms

exp.get('/', (req, res) => {
    res.status(200).send('<a href=/products>Get All Products</a>');
});

exp.get('/jade', (req, res) => {
    let currTime = new Date().toLocaleDateString() + ' - ' + new Date().toLocaleTimeString();
    res.render('homepage', {currentTime: currTime});
});

exp.get('/form', (req, res) => {
    res.status(200).send('<form action=/form_data method=POST> <label />Username <input type=text name=username /> <br /> <input type=submit value=Submit> </form>');
});

exp.post('/form_data', (req, res) => {
    res.status(200).send(`Username : ${req.body.username}`);
});

exp.get('/products', (req, res) => {
    res.status(200).json(products);
});

exp.get('/products/:id', (req, res) => {
    const product = products.filter((product) => product.id === Number(req.params.id));
    product.length > 0 ?
        res.status(200).json(product) :
        res.status(200).send('No product found with this id');
});

exp.all('*', (req, res) => {
    res.status(404).send('Page Not Found');
});

exp.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});