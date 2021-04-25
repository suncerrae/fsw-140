const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const morgan = require('morgan');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'hr'
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database Connection Successful!")
})

app.get("/get", (req, res) => {
  let sqlSelect = "SELECT * FROM employees;";
  db.query(sqlSelect, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result);
  });
});


app.post("/post", (req, res) => {
  let sql = "INSERT INTO employees SET ?";
  let post = {
      FIRST_NAME: req.body.FIRST_NAME,
      LAST_NAME: req.body.LAST_NAME,
      // EmpStreetAddress: req.body.EmpStreetAddress,
      // EmpCity: req.body.EmpCity,
      // EmpState: req.body.EmpState,
      PHONE_NUMBER: req.body.PHONE_NUMBER,
      // EmpZipCode: req.body.EmpZipCode,
      // EmpAreaCode: req.body.EmpAreaCode
  };
  db.query(sql, post, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result)
  });
});

app.delete("/delete/:employeeId", (req, res) => {
  let sql = `DELETE FROM employees WHERE EmployeeID = '${req.params.employeeId}'`
  db.query(sql, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send("Successfully Removed Employee!")
  });
});


app.put("/edit/:employeeId", (req, res) => {
  let updateFirst_Name = req.body.First_Name;
  let updateLast_Name = req.body.Last_Name;
  // let updateEmpStreetAddress = req.body.EmpStreetAddress;
  // let updateEmpCity = req.body.EmpCity;
  // let updateEmpState = req.body.EmpState;
  let updatePhone_Number = req.body.Phone_Number;
  // let updateEmpZipCode = req.body.EmpZipCode;
  // let udpateEmpAreaCode = req.body.EmpAreaCode;
  let sql = `UPDATE employees SET 
  EmpFirstName = '${updateFirst_Name}',
  EmpLastName = '${updateLast_Name}',
  // EmpStreetAddress = '${updateEmpStreetAddress}',
  // EmpCity = '${updateEmpCity}',
  // EmpState = '${updateEmpState}',
  EmpPhoneNumber = '${updatePhone_Number}',
  // EmpZipCode = '${updateEmpZipCode}',
  // EmpAreaCode = '${udpateEmpAreaCode}'
      WHERE EmployeeID = '${req.params.employeeId}'`
  db.query(sql, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result);
  });
});

app.listen(8000, () => {
  console.log("Running on Port 8000")
})