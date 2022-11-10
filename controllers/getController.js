const Department = require("../models/department");
const Employee = require("../models/employee");

exports.getEmployees = async function (req, res) {
  const empData = await Employee.findAll({
    attributes: [
      ["emp_id", "ID"],
      ["emp_name", "NAME"],
      ["emp_salary", "SALARY"],
    ],
    include: {
      model: Department,
      as: "Department",
      attributes: [
        ["department_id", "DEPT_ID"],
        ["department_name", "DEPT_NAME"],
      ],
    },
  });
  return res.status(200).json({ empData });
};

exports.getSalaryDistribution = async (req, res, next) => {
  const EmployeeData = await Employee.findAll({
    include: {
      model: Department,
      as: "Department",
    },
  });
  let distribution = [];
  let salaryMap = {};
  const depart = await Department.findAll({ raw: true });
  depart.map((item) => {
    salaryMap[item.department_name] = 0;
  });
  EmployeeData.map((item) => {
    salaryMap[item.Department.department_name] += item.emp_salary;
  });
  console.log(salaryMap);
  return res.status(200).json({ SalaryDistribution: salaryMap });
};
