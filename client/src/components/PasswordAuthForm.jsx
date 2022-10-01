import React, { useState } from 'react'
import { Form,Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

export const PasswordAuthForm = () => {

  const [passwords, setPassword] = useState({
    password: ""
  })
 

    const onChange = e => {    
      setPassword({...passwords, [e.target.name] : e.target.value})
    }

    const { password } = passwords

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {password}
            
            const response = await fetch(
                "http://localhost:8000/passwordauth",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem('token') 
                    },
                    body: JSON.stringify(body)
                }
            )
            
            const parseRes = await response.json()

            if(parseRes.token) {
                //localstorage
                localStorage.setItem("token", parseRes.token)

                
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
    <>

            
                <ToastContainer />

                <Form onSubmit={onSubmitForm} >
                <Form.Group  className="p-4 p-sm-3" >


                <Form.Label className="fw-bold">Enter Password:</Form.Label>
                  <Form.Control type="password" 
                              id="passwordForm" 
                              name="password" 
                              value={password} 
                              onChange={e => onChange(e)}/>
                <br></br>
                <Button type="submit" variant="outline-success">Authenticate</Button>
                
                </Form.Group>
                </Form>
               
        

    </>
    
  )
}