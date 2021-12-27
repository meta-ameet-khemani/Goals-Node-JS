const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const config = require('./config/database');

const app = express();

connectToDB();

// var mongoose = require('mongoose')
//     , Admin = mongoose.mongo.Admin;

/// create a connection to the DB    
// var connection = mongoose.createConnection(
//     'mongodb://localhost/articles');
// connection.on('open', function() {
//     // connection established
//     new Admin(connection.db).listDatabases(function(err, result) {
//         console.log('listDatabases succeeded');
//         // database list stored in result.databases
//         var allDatabases = result.databases;   
//         console.log(allDatabases.length);
//         allDatabases.forEach(db => console.log(db));
//     });
// });

// mongoose.connect('mongodb://localhost:27017/article');
// const dbConnect = mongoose.connection;

// mongoose.connection.on('open', function (ref) {
//     console.log('Connected to mongo server.');
//     //trying to get collection names
//     mongoose.connection.db.listCollections().toArray(function (err, names) {
//         console.log(names); // [{ name: 'dbname.myCollection' }]
//         // module.exports.Collection = names;
//     });
// });
// dbConnect.once('open', () => {
//     console.log('Connected with DB');
// });

// dbConnect.on('error', (err) => {
//     console.log('Error in connecting with DB: ', err);
// });

async function connectToDB() {
    try {
        // await mongoose.connect("mongodb://localhost:27017/article");
        await mongoose.connect(config.database);
        // const connection = await mongoose.connect("mongodb://localhost:27017/employees");
        // const collections = await connection.connection.db.collections();
        // collections.forEach((doc) => {
        //     console.log(doc.collectionName);
        // });
        console.log('Connected to db !!!');
    } catch (error) {
        console.log('Error in connecting to db ', error);
    }
}

// using middleware for json req res
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// setting up flash
app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// setting up passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
// app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

const articleRoutes = require('./routes/article');
const userRoutes = require('./routes/user');

app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

app.use('/', articleRoutes);
app.use('/user', userRoutes);

// app.get('/login', function(req, res) {
//     res.render('login', {message: req.flash('error')});
// });

// app.post('/login', passport.authenticate('local', {
//     successRedirect : '/profile',
//     failureRedirect : '/login',
//     failureFlash : true
// }));

app.listen(3000, () => {
    console.log('Listening on port 3000 ...');
});