const express = require("express");

const router = express.Router();
const getController = require("../controllers/getController");

router.get("/employees", getController.getEmployees);

router.get("/salaryDistribution", getController.getSalaryDistribution);

module.exports = router;
