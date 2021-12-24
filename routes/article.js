const express = require('express');
const router = express.Router();

let Article = require('../models/article');

router.get('/', async (req, res) => {
    try {
        var articles = await Article.find();
        // res.status(200).json({success: true, data: articles, length: articles.length});
        res.render('index', {
            title: 'My Articles',
            articles: articles
        });
    } catch (error) {
        res.status(500).json({success: false, message: error});   
    }
});

router.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add Article'
    });
});

router.post('/article', async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        await Article.create(req.body)
            .then((article) => {
                console.log('New article created: ', article);
            })
            .catch((err) => {
                console.log('Error in creating new article: ', err);
            });
    }
    res.redirect('/');
});

router.get('/article/:id', async (req, res) => {
    try {
        var article = await Article.findOne({_id: req.params.id});
        // res.status(200).json({success: true, data: article});
        res.render('article', {
            article: article
        });
    } catch (error) {
        res.status(500).json({success: false, message: error});   
    }
});

router.get('/article/edit/:id', async (req, res) => {
    try {
        var article = await Article.findById(req.params.id);
        // res.status(200).json({success: true, data: article});
        res.render('edit_article', {
            article: article
        });
    } catch (error) {
        res.status(500).json({success: false, message: error});   
    }
});

router.post('/article/edit/:id', async (req, res) => {
    try {
        await Article.findByIdAndUpdate(req.params.id, req.body, {new: true});
        // res.status(200).json({success: true, data: article});
        res.redirect('/');
    } catch (error) {
        res.status(500).json({success: false, message: error});   
    }
});

router.delete('/article/delete/:id', async (req, res) => {
    try {
        const article = await Article.findOneAndDelete({_id: req.params.id});
        res.status(200).json({success: true, data: article});
    } catch (error) {
        res.status(500).json({success: false, message: error});
    }
});

module.exports = router;