const Sequelize = require("sequelize");

const sequelize = require("../util/databaseConnection");

const Department = sequelize.define(
  "department",
  {
    department_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    department_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Department;
