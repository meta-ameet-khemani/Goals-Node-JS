const express = require('express');
const router = express.Router();
const Employee = require('../models/employee_model');

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        // console.log(employees);
        res.status(200).json({success: true, data: employees, length: employees.length});
    } catch (error) {
        res.status(500).json({success: false, message: error});   
    }
});

// router.get('/', (req, res) => {
//     res.status(200).json({success: true, data: "Homepage"});
// });

router.get('/:empID', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.empID);
        employee == null ?
            res.status(200).json({success: true, data: "No employee found with id " + req.params.empID}) :
            res.status(200).json({success: true, data: employee});
    } catch (error) {
        res.status(500).json({success: false, message: "Invalid format", description: error});   
    }
});

router.delete('/:empID', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.empID);
        res.status(200).json({success: true, data: "Deleted employee with id " + req.params.empID});
    } catch (error) {
        res.status(200).json({success: false, error: error});
    }
});

router.post('/', (req, res) => {
    const newEmployee = new Employee({
        firstName: req.body.firstName,
        age: req.body.age,
        isAlive: req.body.isAlive,
        occupation: req.body.occupation,
        gender: req.body.gender,
        address: {
            street: req.body.address.street,
            city: req.body.address.city,
            state: req.body.address.state,
        },
        memberships: req.body.memberships,
        balance: req.body.balance
    });
    newEmployee.save().then((data) => {
        res.status(200).json({success: true, data: data});
    }).catch((error) => {
        res.status(500).json({success: false, error: error});
    });
});

router.patch('/:empID', (req, res) => {
    let data = {};
    req.body.firstName === undefined ? undefined : data["firstName"] = req.body.firstName;
    req.body.age === undefined ? undefined : data["age"] = req.body.age;
    req.body.isAlive === undefined ? undefined : data["isAlive"] = req.body.isAlive;
    req.body.occupation === undefined ? undefined : data["occupation"] = req.body.occupation;
    req.body.gender === undefined ? undefined : data["gender"] = req.body.gender;
    req.body.address === undefined ? undefined : data["address"] = req.body.address;
    req.body.memberships === undefined ? undefined : data["memberships"] = req.body.memberships;
    req.body.balance === undefined ? undefined : data["balance"] = req.body.balance;
    Employee.findByIdAndUpdate(req.params.empID, data, { multi: false, new: true } , (error, docs) => {
        if (error)
            res.status(500).json({success: false, error: error});
        else
            res.status(200).json({success: true, data: docs});
    }); 
});

module.exports = router;