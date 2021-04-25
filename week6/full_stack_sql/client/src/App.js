import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Employees from './components/Employees';
import AddEmployees from './components/AddEmployees'
import './App.css';

function App() {

  const [employees, setEmployees] = useState([])
  
  const getEmployees = (() => {
      axios.get("http://localhost:8000/get")
          .then(res => {
            console.log (res);
            setEmployees(res.data)})
          .catch(err => console.log(err))
  })

  const addEmployee = ((newEmployee) => {
    axios.post("http://localhost:8000/post", newEmployee)
        .then(res => {
            setEmployees(prevEmployees => [...prevEmployees, res.data])
        })
        .catch(err => console.log(err))
  })

  const deleteEmployee = ((employeeId) => {
    axios.delete(`http://localhost:8000/delete/${employeeId}`)
        .then(res => {
            setEmployees(prevEmployees => prevEmployees.filter(employee => employee.EmployeeID !== employeeId))
        })
        .catch(err => console.log(err))
  })

  const editEmployee = ((updates, employeeId) => {
    axios.put(`http://localhost:8000/edit/${employeeId}`, updates)
        .then(res => {
            setEmployees(prevEmployees => prevEmployees.map (employee => employee.EmployeeID !== employeeId ? employee : res.data))
        })
        .catch(err => console.log(err))
  })





useEffect(() => {
      getEmployees()
  }, [])


return (
    <div>
        <h1 className='title'>New Hire Badge Database</h1>
        <AddEmployees 
            submit={addEmployee}
            btnText="Add Employee"
        />
      {
        employees.map(employee => 
          
        {
          // console.log (employee);
//           COMMISSION_PCT: 0
// // DEPARTMENT_ID: 20
// // EMAIL: "PFAY"
// // EMPLOYEE_ID: 202
// // FIRST_NAME: "Pat"
// // HIRE_DATE: "1987-09-27T04:00:00.000Z"
// // JOB_ID: "MK_REP"
// // LAST_NAME: "Fay"
// // MANAGER_ID: 201
// // PHONE_NUMBER: "603.123.6666"
// // SALARY: 6000
          return <Employees
            {...employee}
            EmployeeID={employee.EMPLOYEE_ID}
            EmpFirstName={employee.FIRST_NAME}
            EmpLastName={employee.LAST_NAME}
            // EmpStreetAddress={employee.EmpStreetAddress}
            // EmpCity={employee.EmpCity}
            // EmpState={employee.EmpState}
            EmpPhoneNumber={employee.PHONE_NUMBER}
            // EmpZipCode={employee.EmpZipCode}
            // EmpAreaCode={employee.EmpAreaCode}
            deleteEmployee={deleteEmployee}
            editEmployee={editEmployee}
          />}) 
        }
    </div>
  )
}

export default App;