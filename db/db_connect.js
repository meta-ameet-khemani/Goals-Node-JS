const mongoose = require('mongoose');

async function createConnection() {
    try {
        await mongoose.connect(require('../config/db').database);
        console.log('Connected to db ...');
    } catch (error) {
        console.log('Error in connecting to db : ', error);
    }
}

module.exports = createConnection;