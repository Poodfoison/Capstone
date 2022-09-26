import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import bgimage from '../assets/bg2.jpg'
import { NavigationBar } from './NavigationBar';



const Styles = styled.div`
.hero {
    background: url(${bgimage}) no-repeat fixed;
    width: 100%;
    height: 100vh;
    background-size: cover;
  }
  
  .btn-login {
    font-size: 0.9rem;
    letter-spacing: 0.05rem;
    padding: 0.75rem 1rem;
  }
  

`;



const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    //setting the inputs
    const onChange = e => {    //username     : barney   
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    //deconstructing the username and password variable from the inputs
    const { username, password } = inputs

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {

            //making a body object from the values of username and password
            const body = { username, password }

            //fetch api for POST method
            const response = await fetch(
                "http://localhost:8000/login",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )

            const parseRes = await response.json()
   


            if (parseRes.token) {
                //localstorage
                localStorage.setItem("token", parseRes.token)
                setAuth(true)
            } else {
                setAuth(false)
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

        <>
        
        <Styles>
            <div className="hero">
            <NavigationBar />
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                            <form onSubmit={onSubmitForm} className="p-4 p-sm-3">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        id="usernameForm"
                                        name="username"
                                        className="form-control"
                                        value={username}
                                        onChange={e => onChange(e)} />
                                    <label className="form-label">username</label>
                                </div>


                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        id="passwordForm"
                                        name="password"
                                        className="form-control"
                                        value={password}
                                        onChange={e => onChange(e)} />
                                    <label className="form-label">Password</label>
                                </div>


                                <div className="d-grid">
                                    <button className="btn btn-outline-success btn-login text-uppercase fw-bold" type="submit">Sign
                                        in</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </div>
        <ToastContainer />
        </Styles>
        </>
    )
}
export default Login;