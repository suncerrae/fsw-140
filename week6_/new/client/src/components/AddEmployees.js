import React, { useState } from 'react';


function AddEmployees(props){

    const initInputs = { FIRST_NAME: props.FIRST_NAME || "", LAST_NAME: props.LAST_NAME || "", PHONE_NUMBER: props.PHONE_NUMBER || "", EMAIL: props.EMAIL || "", EMPLOYEE_ID: props.EMPLOYEE_ID || ""  }
    
    const [inputs, setInputs] = useState(initInputs)

    const handleChange = ((e) => {
        const {name, value } = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    })
    
    const handleSubmit = ((e) => {
        props.submit(inputs, props.EmployeeID)
        setInputs(initInputs)
    })

    return (
        <div>
        <h1 className="form-title">Information Form</h1>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="FIRST_NAME"
                    value={inputs.FIRST_NAME}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="form-text"
                />
                <input
                    type="text"
                    name="LAST_NAME"
                    value={inputs.LAST_NAME}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="form-text"
                />
                            
                <input
                    type="text"
                    name="EMAIL"
                    value={inputs.EMAIL}
                    onChange={handleChange}
                    placeholder="State ex.(CA)"
                    className="form-text"
                />
                              
                <input
                    type="text"
                    name="PHONE_NUMBER"
                    value={inputs.PHONE_NUMBER}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="form-text"
                />
                 <input
                    type="text"
                    name="EMPLOYEE_ID"
                    value={inputs.EMPLOYEE_ID}
                    onChange={handleChange}
                    placeholder="ID #"
                    className="form-text"
                />
                <button className="add-btn">{ props.btnText }</button>
            </form>
        </div>
        </div>
    )
}
