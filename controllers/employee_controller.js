const { employees } = require('../data/employee');

const getAllEmployees = (req, res) => {
    const employeeSet = employees.map((emp) => {
        const { id, name, team } = emp;
        return { id, name, team };
    });
    res.status(200).json({ success: true, data: employeeSet });
};

const getEmployeeById = (req, res) => {
    const employee = employees.find((emp) => emp.id === Number(req.params.id));
    employee === undefined ?
        res.status(200).json({ success: true, data: `No employee found with id ${req.params.id}.` }) :
        res.status(200).json({ success: true, data: employee });
};

const createEmployee = (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
        res.status(400).send({ success: false, data: 'Please provide name and age of employee' });
    } else {
        const newId = (employees.length + 1);
        employees.push({
            id: newId,
            name: name,
            age: age,
            role: 'QA Engineer',
            team: 'FE'
        });
        const employee = employees.find((emp) => emp.id === Number(newId));
        employee === undefined ?
            res.status(500).json({ success: true, data: 'Could not create employee.' }) :
            res.status(200).json({ success: true, data: employee });
    }
};

const updateEmployeeById = (req, res) => {
    const employee = employees.find((emp) => emp.id === Number(req.params.id));
    if (employee === undefined) {
        res.status(200).json({ success: true, data: `No employee found with id ${req.params.id}.` });
    } else {
        const { name, age, role, team } = req.body;
        if (!name && !age && !role && !team) {
            res.status(400).json({ success: false, data: 'No values provided to update.' });    
        }
        if (name)
            employee.name = name;
        if (age)
            employee.age = age;
        if (role)
            employee.role = role;
        if (team)
            employee.team = team;
        res.status(200).json({ success: true, data: employee });
    }
};

const deleteEmployeeById = (req, res) => {
    const employee = employees.find((emp) => emp.id === Number(req.params.id));
    employee === undefined ?
        res.status(200).json({ success: true, data: `No employee found with id ${req.params.id}.` }) :
        res.status(200).json({ success: true, data: 'Deleted (virtually)' });
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployeeById,
    deleteEmployeeById,
};