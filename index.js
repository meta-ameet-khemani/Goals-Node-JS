const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

const createConnection = require('./db/db_connect');

// connecting to DB
createConnection();

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// setting up template
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// setting up bootstrap and jquery
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

// Express Session Middleware
// NOTE:- session support is required for passport also
app.use(session({
    secret: 'mysecretkey',
    resave: true,
    saveUninitialized: true
}));

// connecting to flash
app.use(flash());

// global variables for flash messages
app.use((req, res, next) => {
    // setting success_msg (flash variable) as success_msg (our global variable)
    // so that when we want to show any message, we just have to use these
    res.locals.successMsg = req.flash('success_msg');
    res.locals.errorMsg = req.flash('error_msg');
    next();
});

// setting up passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// pass user object (if any) to all other routes 
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// get routes
app.use('/', require('./routes/app'));
app.use('/user', require('./routes/user'));

app.listen(3000, () => {
    console.log('Server is listening on port 3000 ...');
});
