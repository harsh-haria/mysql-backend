const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const isAuth = require("../middleware/is-auth");

router.post("/generateToken", authController.tokenGenerator);

router.post("/verifyToken", isAuth, authController.verificationStatus);

module.exports = router;
