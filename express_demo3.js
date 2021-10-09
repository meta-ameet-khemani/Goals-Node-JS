// how to use params and query string on data in API in express

const exp = require('express')();
const { products } = require('./data/test_data');

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

exp.get('/products/search/query', (req, res) => {
    const { name, limit } = req.query;
    var searchedProducts = [...products];
    if (name) {
        searchedProducts = searchedProducts.filter((product) => {
            if (product.name.toLowerCase().startsWith(name)) {
                return product;
            }
        });
    }
    if (limit) {
        if (Number(limit) <= searchedProducts.length) {
            searchedProducts = searchedProducts.slice(Number(limit));
        }
    }
    searchedProducts.length > 0 ?
        res.status(200).json(searchedProducts) :
        res.status(200).send('No product found');
});

exp.all('*', (req, res) => {
    res.status(404).send('Page Not Found');
});

exp.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});