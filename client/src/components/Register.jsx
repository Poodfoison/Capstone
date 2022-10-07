import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        contact: "",
        email: "",
        block: "",
        lot: "",
        street: "",

    })

    const onChange = e => {    
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const { username, password, firstname, lastname, contact, email,block, lot, street } = inputs

    const onSubmitForm = async (e) => {
        e.preventDefault()
       
        try {
            const body = {username, password, firstname, lastname, contact, email,block, lot, street}
            
            const response = await fetch(
                "https://capstone-project-stacktrek-svr.herokuapp.com/register",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )
            
            const parseRes = await response.json()

            if(parseRes.token) {
                //localstorage
                localStorage.setItem("token", parseRes.token)
                toast.success('Registered Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
  
            } else {
  
                toast.error(parseRes.msg, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                     closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });  
            }
 
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        
        <div>
            <ToastContainer />

            <div className="container-sm  justify-content-center align-items-center">

            <form onSubmit={onSubmitForm} autoComplete="off">

            <h3>Account Info:</h3>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={username}
                    onChange={e => onChange(e)}
                    required />
                    <label className="form-label" htmlFor="floatingUsername">Username:</label>
                </div>


            <div className="form-floating mb-3">
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={e => onChange(e)} 
                    required/>
              <label className="form-label" htmlFor="floatingPassword">Password:</label>
                </div>

                <div className="form-floating mb-3">
                <input
                    type="text"
                    name="firstname"
                    className="form-control"
                    value={firstname}
                    onChange={e => onChange(e)} 
                    required/>
              <label className="form-label" htmlFor="floatingFirstName">First Name:</label>
                </div>
                

                <div className="form-floating mb-3">
                <input
                    type="text"
                    name="lastname"
                    className="form-control"
                    value={lastname}
                    onChange={e => onChange(e)} 
                    required/>
              <label className="form-label" for="floatingFirstName">Last Name:</label>
                </div>

                <div className="form-floating mb-3">
                <input
                    type="text"
                    name="contact"
                    className="form-control"
                    value={contact}
                    onChange={e => onChange(e)}
                    required />
              <label className="form-label" for="floatingContact">Contact:</label>
                </div>

                <div className="form-floating mb-3">
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={e => onChange(e)} 
                    required/>
              <label className="form-label" for="floatingPassword">Email Address:</label>
                </div>
                <h3>Address:</h3>

                <div className="form-floating mb-3">
                <input
                    type="text"
                    name="lot"
                    className="form-control"
                    value={lot}
                    onChange={e => onChange(e)}
                    required />
              <label className="form-label" for="floatingPassword">Lot No.:</label>
                </div>


                <div className="form-floating mb-3">
                <input
                    type="text"
                    name="block"
                    className="form-control"
                    value={block}
                    onChange={e => onChange(e)} 
                    required/>
                    
              <label className="form-label" for="floatingPassword">Block No.:</label>
                </div>



                <div className="form-floating mb-3">
                <input
                    type="text"
                    name="street"
                    className="form-control"
                    value={street}
                    onChange={e => onChange(e)} 
                    required/>
              <label className="form-label" for="floatingPassword">Street:</label>
                </div>


                <button className="btn btn-outline-success btn-block mb-4 " >Submit</button>
            </form>
            </div>
            
            
        </div>
    )
}
export default Register;