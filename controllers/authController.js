const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { json } = require("body-parser");

dotenv.config();

exports.verificationStatus = (req, res, next) => {
  res.status(200).json({ message: "Account verified!" });
};

exports.tokenGenerator = (req, res, next) => {
  console.log(req.headers);
  console.log(req.body);
  //   return res.status(200).json({ message: "request received" });
  const employeeName = req.body.name;
  const employeeId = req.body.id;
  const token = jwt.sign(
    {
      name: employeeName,
      id: employeeId,
    },
    process.env.ENCRYPTION_KEY,
    { expiresIn: "1h" }
  );
  res.status(200).json({ token: token, name: employeeName, id: employeeId });
};
