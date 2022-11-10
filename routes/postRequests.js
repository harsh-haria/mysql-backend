const express = require("express");

const router = express.Router();
const postController = require("../controllers/postController");

router.post("/department", postController.addDepartment);

router.post("/employee", postController.addEmployee);

module.exports = router;
