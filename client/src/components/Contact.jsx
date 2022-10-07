import React, { useState} from 'react'
import { Col, Container, Form ,Button, Card,Row } from 'react-bootstrap';
import { NavigationBar } from './NavigationBar';
import bgimage from '../assets/bg4.jpg'
import { ToastContainer, toast } from 'react-toastify';






export const Contact = () => {

  const [messages, setMessage] = useState([])

    const onChange = e => {    
      setMessage({...message, [e.target.name] : e.target.value})
    }

    const { name, email, contact, message } = messages

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {name, email, contact, message}
            
            const response = await fetch(
                "https://capstone-project-stacktrek-svr.herokuapp.com/message",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json", 
                    },
                    body: JSON.stringify(body)
                }
            )
            
            const parseRes = await response.json()

            if(parseRes) {
                toast.success('Message Sent Successfully', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
            } else {
              toast.error('Message failed', {
                position: "top-center",
                autoClose: 5000,
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
  
    
  return  (
<div style={{ 
      width: `100%`,
      height: `100vh`,
      background: `url(${bgimage})`,
      backgroundSize: `cover`

    }}>
<NavigationBar />
<br/>
<br/>
<br/>
<br/>
<Container>
    <Row>
<Col >
<ToastContainer />               
<Card style={{ height: '390px'}}>
<br/>
<Container>
<Form onSubmit={onSubmitForm.value}>
<h4>Send us your Concerns</h4>
    <Form.Group  controlId="exampleForm.ControlInput1">
        <Form.Label className="fw-bold">Full Name:</Form.Label>
        <Form.Control type="name" 
                      placeholder="Enter Full Name"
                      id="nameForm" 
                      name="name" 
                      value={name} 
                      onChange={e => onChange(e)}/>
    </Form.Group>
    <br/>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className="fw-bold">Email address</Form.Label>
        <Form.Control type="email" 
                      placeholder="Enter Email Address" 
                      id="emailForm" 
                      name="email"  
                      value={email} 
                      onChange={e => onChange(e)}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className="fw-bold">Contact Number:</Form.Label>
        <Form.Control type="contact" 
                      placeholder="Enter Contact Number" 
                      id="contactForm" 
                      name="contact"  
                      value={contact} 
                      onChange={e => onChange(e)}/>
    </Form.Group>

    <Button type="submit" variant="outline-success" block>Submit</Button>
    <br/>
    <span> </span>
    </Form>
    </Container>
    
    </Card>
        </Col>
<Col>
<Card style={{ height: '390px'}}>
<br/>
<Container>
<Form onSubmit={onSubmitForm}>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className="fw-bold">Message:</Form.Label>
        <Form.Control as="textarea"
                      id="messageForm" 
                      name="message"  
                      value={message} 
                      onChange={e => onChange(e)}
        rows={11} style={{ resize: 'none'}} />
      </Form.Group>
    </Form>


</Container>
    <br/>
    </Card>
</Col>
</Row>

        </Container>          
        </div>

)
  }