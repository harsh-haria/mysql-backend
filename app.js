const express = require("express");
const bodyParser = require("body-parser");
var interceptor = require("express-interceptor");
const Employee = require("./models/employee");
const Department = require("./models/department");

const logger = require("./util/logger");

const sequelize = require("./util/databaseConnection");

const authRoutes = require("./routes/is-auth");
const postRoutes = require("./routes/postRequests");
const getRoutes = require("./routes/getRequests");
const missRoutes = require("./routes/missRequests.js");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

var mainInterceptor = interceptor(function (req, res) {
  return {
    isInterceptable: function () {
      console.log("Interceptable");
      return true;
      // return false;
    },
    intercept: function (body, send) {
      console.log("Intercept", body);
      let object = JSON.parse(body);
      object.value = "InterceptedData";
      let finalValue = JSON.stringify(object);
      send(finalValue);
    },
    afterSend: (oldBody, newBody) => {
      console.log("After Send");
      console.log(req.body, "=>", oldBody, "=>", newBody); //can be logged
    },
  };
});
app.use(mainInterceptor);

//Relations
Department.hasMany(Employee, {
  foreignKey: "emp_departmentId",
  as: "Employees",
});
Employee.belongsTo(Department, {
  foreignKey: "emp_departmentId",
  as: "Department",
});

//routes
app.use(authRoutes);
app.use(missRoutes);

app.use("/add", postRoutes);
app.use("/fetch", getRoutes);

//server
sequelize.sync().then(function () {
  app.listen(process.env.PORT || 3000, function () {
    console.log(`Listening on port ${process.env.PORT || 3000}`);
  });
});
