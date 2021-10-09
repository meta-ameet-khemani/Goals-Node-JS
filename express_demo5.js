// use of morgan package as logger in express

const exp = require('express')();
const { products } = require('./data/test_data');
const morgan = require('morgan');

exp.use(morgan('tiny'));
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