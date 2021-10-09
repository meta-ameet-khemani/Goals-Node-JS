const authorize = (req, res, next) => {
    const { user } = req.query;
    user !== undefined ?
        user === 'admin' ?
            next() :
            res.status(401).send('Unauthorized') :
        res.status(401).send('Unauthorized');
}

module.exports = { authorize };