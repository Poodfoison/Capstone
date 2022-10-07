import React, { useState,useEffect } from 'react'
import {  Form,Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

export const UpdateForm = ({setAuth}) => {

    
    const [info, setInfo] = useState("");


    const getProfile = async () => {
        try {
            //fetch api that uses the GET method
            const response = await fetch(
                "https://capstone-project-stacktrek-svr.herokuapp.com/account",
                {
                    method: "GET",
                    //retrieving the token and putting it in the Auth header
                    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
                })
            //parsing the json back to a JS object
            const parseRes = await response.json();
            console.log(parseRes)
            
            const data = {
                firstname: parseRes[0].firstname,
                lastname: parseRes[0].lastname,
                email: parseRes[0].email,
                contact: parseRes[0].contact,
                lot: parseRes[0].lot,
                block: parseRes[0].block,
                street: parseRes[0].street,
              

            }
            setInfo(data);
        

        } catch (error) {
            console.log(error.message)
        }
    }



    const onChange = e => {    
        setInfo({...info, [e.target.name] : e.target.value})
    }

    const { firstname, lastname, contact, email, lot, block, street } = info

    const handleSubmit  = async (e) => {
        e.preventDefault()
        console.log(info)
        try {
            const body = {firstname, lastname, contact, email, lot, block, street }
            
            const response = await fetch(
                "http://localhost:8000/updatelogin",
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
                setAuth(true)
                toast.success('Update Successfull', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
                
            } else {
                setAuth(false)
            }

            
 
        } catch (error) {
            console.log(error.message)
        }
    }

    


    useEffect(() => {     
        getProfile();
    }, [])
  return (
    <>

                <ToastContainer />

                <Form onSubmit={handleSubmit} key={info.id}>
                <Form.Group  className="p-4 p-sm-3" >

                <Form.Label className="fw-bold">First Name:</Form.Label>
                  <Form.Control type="text" 
                              id="firstnameForm" 
                              name="firstname"
                              value={info.firstname}
                              onChange={e => onChange(e)}/>


                <Form.Label className="fw-bold">Last Name:</Form.Label>
                  <Form.Control type="text" 
                              id="lastnameForm" 
                              name="lastname" 
                              value={info.lastname}  
                              onChange={e => onChange(e)}/>

                

                <Form.Label className="fw-bold">Email Address:</Form.Label>
                  <Form.Control type="text" 
                              id="emailForm" 
                              name="email" 
                              defaultValue={info.email}
                              onChange={e => onChange(e)}/>

                <Form.Label className="fw-bold">Contact Number:</Form.Label>
                  <Form.Control type="text" 
                              id="contactForm" 
                              name="contact" 
                              value={info.contact} 
                              onChange={e => onChange(e)}/>


                <Form.Label className="fw-bold">Lot No.:</Form.Label>
                  <Form.Control type="text" 
                              id="lotForm" 
                              name="lot" 
                              value={info.lot}  
                              onChange={e => onChange(e)}/>

                <Form.Label className="fw-bold">Block No.:</Form.Label>
                  <Form.Control type="text" 
                              id="blockForm" 
                              name="block"
                              value={info.block}
                              onChange={e => onChange(e)}/>

                
                <Form.Label className="fw-bold">Street:</Form.Label>
                  <Form.Control type="text" 
                              id="streetForm" 
                              name="street" 
                              value={info.street}  
                              onChange={e => onChange(e)}/>


                <br></br>
                <Button type="submit" variant="outline-success">Update</Button>
                </Form.Group>
                </Form>





    </>
    
  )
}