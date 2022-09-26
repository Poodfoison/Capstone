import React, { useEffect, useState } from "react";
import { Nav, Navbar, Container  } from 'react-bootstrap';
import styled from 'styled-components';


const Styles = styled.div`
Nav{



    font-weight: 900;
    font-style: underlined;
    color: black;
  text-decoration-line: underline;
  &:hover {
    color: green;

}


.navbar-brand, .navbar-nav .nav-link {
  color: black;
  text-decoration-line: underline;
  &:hover {
    color: green;
  }
}
Button {
  letter-spacing: 4px;
  font-weight: bold;
}

`;

export const NavLogin = ({ setAuth }) => {
    const [logaccount, setLogaccount] = useState([]);

    const getLogin = async () => {
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
            setLogaccount(parseRes);

        } catch (error) {
            console.log(error.message)
        }
    }

   

    useEffect(() => {
      const interval = setInterval(() => {
        getLogin();
        }, 1000);
        return () => clearInterval(interval);
    }, []) 
    return (
<>
      {logaccount.map(logaccounts =>{
        return <Styles>
        <Navbar expand="xxl" bg="light" key={logaccounts.id}>
        <Container>
          <Navbar.Brand href="/"><img src={require('../assets/logo.png')} alt='logo'/></Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav >
              
              
              <Nav.Item>
          <Nav.Link href="#" >Welcome, {logaccounts.firstname} {logaccounts.lastname}</Nav.Link>
          </Nav.Item>
            </Nav>
          </Navbar.Collapse>
         
              </Container>
        </Navbar>
        </Styles>





      })
      }
    </>
)
}