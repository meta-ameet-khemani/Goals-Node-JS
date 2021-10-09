// how to use middleware such as logger and authorize for example

const exp = require('express')();
const { products } = require('./data/test_data');
const { logger } = require('./middleware/my_logger');
const { authorize } = require('./middleware/authorize');

exp.use([ authorize, logger]);

// const logger = (req, res, next) => {
//     console.log(req.url);
//     console.log(req.method);
//     next();
// }

// exp.get('/', logger, (req, res) => {
//     res.status(200).send('<a href=/products>Get All Products</a>');
// });

// exp.get('/products', logger, (req, res) => {
//     res.status(200).json(products);
// });

// exp.get('/', logger, (req, res) => {
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