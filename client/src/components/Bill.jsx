import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Card } from 'react-bootstrap';
import logo from '../assets/logo2.png'



export const Bill = ({ setAuth }
    ) => {
    const [bill, setBill] = useState([]);
    const [select, setSelect] = useState();


    const getBill = async (e) => {
        try {
            //fetch api that uses the GET method
            const response = await fetch(
                "https://capstone-project-stacktrek-svr.herokuapp.com/bill",
                {
                    method: "GET",
                    //retrieving the token and putting it in the Auth header
                    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
                })
            //parsing the json back to a JS object
            const parseRes = await response.json();
            setBill(parseRes);

        } catch (error) {
            console.log(error.message)
        }
    }

     




    useEffect(() => {
        getBill();
    }, [])
  return (
    <>
    <Container style={{ 
      backgroundImage: `url(${logo})`,
      height: `84.8vh`,
      position: `relative`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: `center center`
      }}>

    <Row>
    <Col>
    <h1>Billing Dates:</h1>
    <Form.Select onChange={e=> setSelect(e.target.value)} placeholder=''>
    <option>Select Date: </option>
    {bill.sort((a,b) => a.date.split('-').reverse().join().localeCompare(b.date.split('-').reverse().join())).map(bills => {
                return <option key={bills.transactionid}>{bills.date}</option>
    })}
    </Form.Select>
    </Col>
  
    </Row>
    <Row>

    {bill.filter(billing => {
            return select === billing.date
        }).map(billing => {
           let sec = 150
           let misc = 80
          return<Container className="py-5" key={billing.transactionid}>
      <Card>
        
        <Card.Body className="mx-4">
        <Container>

            <p className="my-5 text-center fs-5">
              Monthly Bill
            </p>
            <Row>
              <Card.Text>
                <li className="text-black fw-bold">Name: {billing.name}</li>
                <li className="text-muted mt-1 fw-bold">
                  <span className="text-black">Bill ID: </span> {billing.transactionid}
                </li>
                <li className="text-black mt-1 fw-bold">Date: {billing.date}</li>
              </Card.Text>
              <hr />
              <Col xl="10">
                <p>Water</p>
              </Col>
              <Col xl="2">
                <p className="float-end">{billing.amount}</p>
              </Col>
              <hr />
            </Row>
            <Row>
              <Col xl="10">
                <p>Security and Maintenance</p>
              </Col>
              <Col xl="2">
                <p className="float-end">{sec}</p>
              </Col>
              <hr />
            </Row>
            <Row>
              <Col xl="10">
                <p>Misc.</p>
              </Col>
              <Col xl="2">
                <p className="float-end">{misc}</p>
              </Col>
              <hr style={{ border: "2px solid black" }} />
            </Row>
            <Row className="text-black">
              <Col xl="12">
                <p className="float-end fw-bolder fs-3">Total: ₱ {parseInt(billing.amount) + sec + misc}</p>
              </Col>
              <hr style={{ border: "2px solid black" }} />
            </Row>
          </Container>
        
        </Card.Body>
      </Card>
    </Container>

})}



    </Row>
    </Container>
    </>
  )
}




