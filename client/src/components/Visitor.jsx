import React, { useState } from 'react'
import { Form,Button, Container, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import logo from '../assets/logo2.png'

export const Visitor = ({setAuth}) => {


    const [visitor, setVisitor] = useState({
        firstname: "",
        lastname: "",
        contact: "",
        validid: "",
    })

    const onChange = e => {    
        setVisitor({...visitor, [e.target.name] : e.target.value})
    }

    const { firstname, lastname, contact, validid } = visitor

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {firstname, lastname, contact, validid}
            toast.success('Visitor Successfully Added', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
            const response = await fetch(
                "https://capstone-project-stacktrek-svr.herokuapp.com/addvisitor",
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
            } else {
                setAuth(false)
            }
 
        } catch (error) {
            console.log(error.message)
        }
    }


  return (
    <>
    <Container style={{ 
      backgroundImage: `url(${logo})`,
      height: `84.8vh`,
      position: `relative`,
      backgroundSize: `auto`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: `center center`
      }}>
    <ToastContainer />
 <Form onSubmit={onSubmitForm}>
  <br/>
 <h1>Visitor Form:</h1>
 <Container>
  <Card>
                <Form.Group  className="p-4 p-sm-3" >

                <Form.Label className="fw-bold">First Name:</Form.Label>
                  <Form.Control type="text" 
                              id="firstnameForm" 
                              name="firstname"
                              placeholder='Enter First Name'
                              value={firstname} 
                              onChange={e => onChange(e)}/>


                <Form.Label className="fw-bold">Last Name:</Form.Label>
                  <Form.Control type="text" 
                              id="lastnameForm" 
                              name="lastname" 
                              placeholder='Enter Last Name'  
                              value={lastname} 
                              onChange={e => onChange(e)}/>


                <Form.Label className="fw-bold">Contact No.:</Form.Label>
                  <Form.Control type="text" 
                              id="contactForm" 
                              name="contact" 
                              placeholder='Enter Contact Number'
                              value={contact} 
                              onChange={e => onChange(e)}/>

                <Form.Label className="fw-bold">Valid ID:</Form.Label>
                  <Form.Control type="text" 
                              id="valididForm" 
                              name="validid" 
                              placeholder='Enter Valid ID'
                              value={validid} 
                              onChange={e => onChange(e)}/>
         

                <br></br>
                <Button type="submit" variant="outline-success" >Submit</Button>
                </Form.Group>
                </Card>
                </Container>
                </Form>
                </Container>

    </>

  )
}

 