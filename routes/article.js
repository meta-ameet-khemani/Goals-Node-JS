const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

let Article = require('../models/article');
let User = require('../models/user');

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        req.logOut();
        res.redirect('/user/login');
    }
}

async function isAuthor(req, res, next) {
    var article = await Article.findById(req.params.id);
    if(req.user._id == article.author) {
        req.article = article;
        next();    
    } else {
        req.logOut();
        res.redirect('/user/login');
    }
}

router.get(
    '/', 
    async (req, res) => {
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
    }
);

router.get(
    '/add', 
    isAuthenticated, 
    (req, res) => {
        res.render('add', {
            title: 'Add Article'
        });
    }
);

router.post(
    '/article', 
    isAuthenticated, 
    body('name').notEmpty(),
    // body('author').notEmpty(),
    body('decription').notEmpty(),
    async (req, res) => {
        if (Object.keys(req.body).length !== 0) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // return res.status(400).json({
                //     success: false,
                //     errors: errors.array()
                // });
                res.render('add', {
                    title: 'Add Article',
                    errors: errors.errors
                });
            }
            req.body.author = req.user._id;
            await Article.create(req.body)
                .then((article) => {
                    console.log('New article created: ', article);
                })
                .catch((err) => {
                    console.log('Error in creating new article: ', err);
                });
        }
        res.redirect('/');
    }
);

router.get(
    '/article/:id', 
    async (req, res) => {
        try {
            var article = await Article.findOne({_id: req.params.id});
            var author = await User.findById({ _id: article.author });
            // article.author = user.name;
            // res.status(200).json({success: true, data: article});
            res.render('article', {
                article: article,
                author: author
            });
        } catch (error) {
            res.status(500).json({success: false, message: error});   
        }
    }
);

router.get(
    '/article/edit/:id', 
    isAuthenticated, 
    isAuthor, 
    async (req, res) => {
        try {
            // var article = await Article.findById(req.params.id);
            // res.status(200).json({success: true, data: article});
            res.render('edit_article', {
                article: req.article
            });
        } catch (error) {
            res.status(500).json({success: false, message: error});   
        }
    }
);

router.post(
    '/article/edit/:id', 
    isAuthenticated, 
    isAuthor, 
    async (req, res) => {
        try {
            await Article.findByIdAndUpdate(req.params.id, req.body, {new: true});
            // res.status(200).json({success: true, data: article});
            res.redirect('/');
        } catch (error) {
            res.status(500).json({success: false, message: error});   
        }
    }
);

router.delete(
    '/article/delete/:id', 
    isAuthenticated, 
    isAuthor, 
    async (req, res) => {
        try {
            const article = await Article.findOneAndDelete({_id: req.params.id});
            res.status(200).json({success: true, data: article});
        } catch (error) {
            res.status(500).json({success: false, message: error});
        }
    }
);

module.exports = router;