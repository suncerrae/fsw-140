import React, { useState } from 'react';
import AddEmployees from './AddEmployees';
import './employees.css';

function Employees(props){

    const { EmployeeID, EmpFirstName, EmpLastName, EmpPhoneNumber, EmpEmail} = props;
    
    const [editToggle, setEditToggle] = useState(false);


    return (
        <div>
        <div>
        <h1 className="badge-title">Badge:</h1>
        </div>
        <div className="container">
        { !editToggle ?
        <> 
            <p className="badge-text"> Employee ID: { EmployeeID }</p>
            <p className="badge-text"> Full Name: { EmpFirstName } { EmpLastName }</p>
            <p className="badge-text"> Phone Number: {EmpEmail} { EmpPhoneNumber }</p>

            <img src={"https://www.osiwa.org/wp-content/uploads/2019/02/Blank-Person.png"} alt=""/>
            <div>
            <button
                className="delete-btn"
                onClick={() => props.deleteEmployee(EmployeeID)}>
                Delete
            </button>
            <button
                className="edit-btn"
                onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                Edit
            </button>
            </div>
        </>
        :
        <>
            <AddEmployees
                EmployeeID={EmployeeID}
                EmpFirstName={EmpFirstName}
                EmpLastName={EmpLastName}
                EmpPhoneNumber={EmpPhoneNumber}
                EmpEmail={EmpEmail}
                btnText="Submit Edit" 
                submit={props.editEmployee}
            />
            <button
                className="delete-btn"
                onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                Close
            </button>
        </>
        }
        </div>
        </div>
    )
}
export default Employees;