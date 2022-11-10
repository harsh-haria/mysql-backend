const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
const { json } = require("body-parser");
dotenv.config();

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    console.log(error);
    return res
      .status(401)
      .json({ message: "Not Authenticated!", statusCode: 401 });
  }

  const token = authHeader.split(" ")[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.ENCRYPTION_KEY);
  } catch (err) {
    console.log(err);
  }
  if (!decodedToken) {
    const error = new Error("Not Authenticated!");
    error.statusCode = 401;
    console.log(error);
    return res
      .status(401)
      .json({ message: "Not Authenticated!", statusCode: 401 });
  }
  next();
};
