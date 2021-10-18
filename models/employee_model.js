const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    age: Number,
    isAlive: Boolean,
    occupation: String,
    gender: String,
    address: {
        street: String,
        city: String,
        state: String,
    },
    memberships: {
        type: Array,
        // default: [],
    },
    balance: Number
});

module.exports = mongoose.model('empdetails', EmployeeSchema);