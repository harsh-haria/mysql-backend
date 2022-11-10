const Sequelize = require("sequelize");

const sequelize = require("../util/databaseConnection");

const Employee = sequelize.define(
  "employee",
  {
    emp_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    emp_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    emp_salary: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Employee;
