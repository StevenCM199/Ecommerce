import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CartSidebar from "./CartSidebar";

const MyNavbar = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login")
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (

    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            Ecommerce
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login"> Login </Nav.Link>
              <Nav.Link as={Link} to="/purchases"> Purchases</Nav.Link>
              <Nav.Link onClick={handleShow}> <i className ="fa-solid fa-cart-shopping"></i> </Nav.Link>
              <Nav.Link onClick={logout} > Logout </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
      <CartSidebar show={show} handleClose={handleClose} /> 

    </>

  );
};

export default MyNavbar;
