import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Employees from './components/Employees';
import AddEmployees from './components/AddEmployees';
import './App.css';

function App() {

  const [employees, setEmployees] = useState([])
  
  const getEmployees = (() => {
      axios.get("http://localhost:7000/get")
          .then(res => setEmployees(res.data))
          .catch(err => console.log(err))
  })

  const addEmployee = ((newEmployee) => {
    axios.post("http://localhost:7000/post", newEmployee)
        .then(res => {
            setEmployees(prevEmployees => [...prevEmployees, res.data])
        })
        .catch(err => console.log(err))
  })

  const deleteEmployee = ((employeeId) => {
    axios.delete(`http://localhost:7000/delete/${employeeId}`)
        .then(res => {
            setEmployees(prevEmployees => prevEmployees.filter(employee => employee.EmployeeID !== employeeId))
        })
        .catch(err => console.log(err))
  })

  const editEmployee = ((updates, employeeId) => {
    axios.put(`http://localhost:7000/edit/${employeeId}`, updates)
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
          return <Employees
            {...employee}
            EmployeeID={employee.EmployeeID}
            FIRST_NAME={employee.FIRST_NAME}
            LAST_NAME={employee.LAST_NAME}
            EmpStreetAddress={employee.EmpStreetAddress}
           PHONE_NUMBER={employee.PHONE_NUMBER}
            EMAIL={employee.EMAIL}
            EMPLOYEE_ID={employee.EMPLOYEE_ID}
            deleteEmployee={deleteEmployee}
            editEmployee={editEmployee}
          />}) 
        }
    </div>
  )
}

export default App;