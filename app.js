const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/.env'});

// import routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postsRoute);

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connection Successful!");
});

// try {
//   await mongoose.connect(process.env.DB_CONNECT);
//   console.log('Connected to db !!!');
// } catch (error) {
//   console.log('Error in connecting to db ', error);
// }

app.listen(3000, () => {
    console.log('Server is listening on port 3000 ...');
});
