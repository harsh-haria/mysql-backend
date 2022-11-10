const Department = require("../models/department");
const Employee = require("../models/employee");

exports.addEmployee = async (req, res) => {
  try {
    const emp = await Employee.create({
      emp_name: req.body.name,
      emp_salary: req.body.salary,
      emp_departmentId: req.body.department_id,
    });
    return res.status(201).json({ message: "Employee created!" });
  } catch (err) {
    console.log(err);
  }
};

exports.addDepartment = async (req, res) => {
  try {
    const emp = await Department.create({
      department_name: req.body.department_name,
    });
    return res.status(201).json({ message: "Department created!" });
  } catch (err) {
    console.log(err);
  }
};
