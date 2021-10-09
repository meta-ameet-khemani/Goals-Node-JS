const express = require('express');
const router = express.Router();

const {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployeeById,
    deleteEmployeeById,
} = require('../controllers/employee_controller');

router.get('/', getAllEmployees);

router.get('/:id', getEmployeeById);

router.post('/', createEmployee);

router.put('/:id', updateEmployeeById);

router.delete('/:id', deleteEmployeeById);

module.exports = router;