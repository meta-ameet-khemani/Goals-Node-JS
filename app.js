const express = require('express');
const mongoose = require('mongoose');
const emploeeRoutes = require('./routes/employee_routes');
const cors = require('cors');

const app = express();

// connectToDB();
connectToDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use('/employee', emploeeRoutes);

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});

async function connectToDB() {
    // mongoose.connect("mongodb://localhost:27017/employees", {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // }, () => {
    //     console.log('Connected to db !!!');
    // }).catch((err) => {
    //     console.log('Error in connecting to db ', err);
    // });
    
    try {
        await mongoose.connect("mongodb://localhost:27017/employees");
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