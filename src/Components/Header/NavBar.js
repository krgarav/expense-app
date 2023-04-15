import React from "react";
import {Navbar,Nav,Container} from "react-bootstrap"
const NavBar = () => {
  return (
    <Navbar bg="light" variant="light" sticky="top">
      <Container>
        <Navbar.Brand  href="#home">My Web Link</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Products</Nav.Link>
          <Nav.Link href="#pricing">About Us</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default NavBar;
