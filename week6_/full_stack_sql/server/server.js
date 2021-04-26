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
// app.use(bodyParser.urlencoded({ extended: true }));


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database Connection Successful!")
})

app.get("/get", (req, res) => {
  let sqlSelect = "SELECT * FROM hr.employees;";
  db.query(sqlSelect, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result);
  });
});


app.post("/post", (req, res) => {
  // let sql = "INSERT INTO hr.employees SET ?";
  let post = {
      FIRST_NAME: req.body.FIRST_NAME,
      LAST_NAME: req.body.LAST_NAME,
     PHONE_NUMBER: req.body.PHONE_NUMBER,
     EMAIL: req.body.EMAIL,
     HIRE_DATE:  "2021-04-25",
     JOB_ID: "IT_PROG",
     SALARY: "17000.00",
     COMMISSION_PCT: "0",
     MANAGER_ID: "100",
     DEPARTMENT_ID: "90"

    //  EMPLOYEE_ID: req.body.EMPLOYEE_ID
  };
  let sql = "INSERT INTO employees SET ?";
  db.query(sql, post, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result)
  });
});

// app.delete("/delete/:EMPLOYEE_ID", (req, res) => {
//   let sql = `DELETE FROM hr.employees WHERE EEMPLOYEE_ID = '${req.params.EMPLOYEE_ID}'`
//   db.query(sql, (err, result) => {
//       if(err){
//           throw (err);
//       }
//       console.log(result);
//       return res.send("Successfully Removed Employee!")
//   });
// });


// app.put("/edit/:EMPLOYEE_ID", (req, res) => {
//   let updateFIRST_NAME = req.body.FIRST_NAME;
//   let updateLAST_NAME = req.body.LAST_NAME;
//   let updatePHONE_NUMBER = req.body.PHONE_NUMBER;
//   let updateEMAIL = req.body.EMAIL;
//   let udpateEMPLOYEE_ID = req.body.EMPLOYEE_ID;
//   let sql = `UPDATE hr.employees SET 
//   FIRST_NAME = '${updateFIRST_NAME}',
//   LAST_NAME = '${updateLAST_NAME}',
//   PHONE_NUMBER = '${updatePHONE_NUMBER}',
//   EMAIL = '${updateEMAIL}',
//   EMPLOYEE_ID = '${udpateEMPLOYEE_ID}'
//       WHERE EMPLOYEE_ID = '${req.params.EMPLOYEE_ID}'`
//   db.query(sql, (err, result) => {
//       if(err){
//           throw (err);
//       }
//       console.log(result);
//       return res.send(result);
//   });
// });

app.listen(7000, () => {
  console.log("Running on Port 7000")
})  