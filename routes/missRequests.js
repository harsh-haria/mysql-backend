const express = require("express");

const router = express.Router();

const miscController = require("../controllers/miscController");

router.post("/merge-sort", miscController.mergeSort);

module.exports = router;
