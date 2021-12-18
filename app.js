const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoDB = require('mongoose');

const app = express();

// connecting to mongoDB server
mongoDB.connect('mongodb://127.0.0.1/users', { useNewUrlParser: true });
const connection = mongoDB.connection;

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function() {
  console.log("Connection Successful!");
});

// creating schema/collection

var usersSchema = mongoDB.Schema({
    name: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var usersData = [];
var users = mongoDB.model('users', usersSchema, 'users');
users.find((err, users) => {
    if (err) {
        console.log('error in fetching users');
        console.log(err);
    } else {
        // console.log(users);
        // console.log(users.length);
        users.forEach(user => {
            const tempUser = {
                id: user._id,
                name: user.name,
                email: user.email,
                date: user.date
            };
            usersData.push(tempUser);
        });
    }
});

// using middleware for logging
app.use((req, res, next) => {
    console.log('Logging ', req.hostname);
    next();
});

// 2. setting a view engine
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// using middleware for json req res
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// using middleware for accessing static files
app.use(express.static(path.join(__dirname, 'static')));
// 1. if we just create a folder with static name and create
// a file with name index.html and don't do anything else
// it will render that file, instead of going to / url 
// in get method or something else

app.get('/', (req, res) => {
    // res.send('Hello All');
    // 2. rendering file
    res.render('index', { users: usersData });
    // OR
    // res.sendFile(path.join(__dirname, '/views/html/index.html'));
    // 3. rendering json object
    // res.json(usersData);
});

// 4.*
app.post('/', (req, res) => {
    console.log(req.body);
    if (Object.keys(req.body).length !== 0) {
        users.create(req.body).then((user) => {
            console.log('Added successfully ', user);
            usersData.push(user);
        }).catch((err) => console.log('Error in saving new document', err));
    }
    res.redirect('/');
});

app.get('/form', (req, res) => {
    res.send('<form action="/" method="post"><label>Name</label><input type="text" name="name" /><br><label>Email</label><input type="text" name="email" /><br><label>Password</label><input type="text" name="password" /><br><button type="submit">Submit</button></form>');
});
// *4

app.get('/user/delete/:id', (req, res) => {
    users.findById({_id: req.params.id}).then(user => console.log(user)).catch(err => console.log(err));
    users.deleteOne({_id: req.params.id}).then(() => {
        function filterUser(user) {
            const userStr = String(user.id);
            user.id = userStr.slice(userStr.indexOf('"') + 1, userStr.length);
            return b !== req.params.id;
        }
        usersData = usersData.filter(filterUser);
        res.redirect('/');
    }).catch(err => console.log(err));
});

app.listen('3000', () => {
    console.log('Listening on port 3000 ...');
});