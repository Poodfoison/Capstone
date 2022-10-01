import React, { useEffect, useState } from "react";
import {  Container,Col, Row, Tabs, Tab, Button, ListGroup, Card  } from 'react-bootstrap';
import { Bill } from './Bill';
import { NavLogin } from './NavLogin';
import { Visitor } from "./Visitor";
import { Feed } from "./Feed";
import { UpdateInfo } from "./UpdateInfo";
import bgimage from '../assets/bg1.jpg'

const Dashboard = ({ setAuth }) => {
    const [account, setAccount] = useState([]);
    const [info, setInfo] = useState(false);

    const getProfile = async () => {
        try {
            //fetch api that uses the GET method
            const response = await fetch(
                "http://localhost:8000/account",
                {
                    method: "GET",
                    //retrieving the token and putting it in the Auth header
                    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
                })
            //parsing the json back to a JS object
            const parseRes = await response.json();
            setAccount(parseRes);

        } catch (error) {
            console.log(error.message)
        }
    }

    const logout = async (e) => {
        e.preventDefault()
        try {
            //removing the token from localstorage
            localStorage.removeItem('token')
            setAuth(false)
        } catch (error) {
            console.log(error.message)
        }
    }



    useEffect(() => {
        const interval = setInterval(() => {
            getProfile();
            }, 1000);
            return () => clearInterval(interval);
    }, [])
    return (

 
        <div style={{ 
      width: `100%`,
      background: `url(${bgimage})`,
      backgroundSize: `cover`

    }}>
       
            {account.map(accounts => {
                return <div key={accounts.id}>
                  <NavLogin  />
                    <Container style={{ backgroundColor:`white`}} >
                    <Row >
    
        <Col md="auto">

        <Card style={{ width: '18rem'}} >
        <Container >
            <br/>
        <Card.Title className="fw-bold text-capitalize">{accounts.firstname} {accounts.lastname}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted fw-bold">Email Address: {accounts.email}</Card.Subtitle>
        <Card.Text className="fw-bold">
        Contact No.: {accounts.contact}
        </Card.Text>
        </Container>
        <br/>
        
      <Card.Header className="fw-bolder text-center fs-4">Address:</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item className="fw-bold text-capitalize">Lot No.: {accounts.lot}</ListGroup.Item>
        <ListGroup.Item className="fw-bold text-capitalize">Block No.: {accounts.block}</ListGroup.Item> 
        <ListGroup.Item className="fw-bold text-capitalize">Street: {accounts.street}</ListGroup.Item>
      </ListGroup>
      <Button variant="outline-success" onClick={() => setInfo(true)}>Update</Button>
        <UpdateInfo
        show={info}
        onHide={() => setInfo(false)}/>
    </Card>
    <br></br>
            <br></br>
      
            <Button onClick={logout} variant="outline-success">Sign Out</Button>
                        </Col>
        <Col>
        <Tabs
      defaultActiveKey="Newsfeed"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="Newsfeed" title="Updates/Announcements">
      <Feed/>
      </Tab>
        
      <Tab eventKey="Bill" title="Bill">
      <Bill/>
      </Tab>

      <Tab eventKey="Visitor" title="Visitor">
      <Visitor/>
      </Tab>
      
      
    </Tabs>

        </Col>
      </Row>
                        
      
                        </Container>
                </div>
            })}
            

            </div>



    )
}
export default Dashboard;