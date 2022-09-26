import React, { useState } from "react";
import { Nav, Navbar, Container,Button  } from 'react-bootstrap';
import styled from 'styled-components';
import { ModalRegister } from "./ModalRegister";


const Styles = styled.div`
Nav{



    font-weight: 900;
    font-style: underlined;
    

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

export const NavigationBar = () => {
 const [modalShow, setModalShow] = useState(false);


return(
<Styles>
    <Navbar expand="xxl" bg="light">
    <Container>
      <Navbar.Brand href="/"><img src={require('../assets/logo.png')} alt='logo'/></Navbar.Brand>
      <Navbar.Toggle/>
      <Navbar.Collapse id="navbarScroll">
        <Nav >
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
      <Nav.Item>
          <Button variant="outline-success" onClick={() => setModalShow(true)}>Sign Up</Button>
          <ModalRegister
        show={modalShow}
        onHide={() => setModalShow(false)}

      />
      <span> </span>
      <span> </span>
          <Button variant="outline-success" className="fw-bold" style={{ letterSpacing: "5px"}} href="/login">Login</Button>
         
          </Nav.Item>
          </Container>
    </Navbar>
    </Styles>
)
}