import { Button, Container, Nav, Navbar, NavbarBrand, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../images/holidaze1.png"


export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="border-bottom border-primary d-flex" sticky="top">
      <Navbar.Brand className="ms-3"  href="#home">
        <img
              src={Logo}
              width="250"
              height="75"
              
              alt="holidaze logo"
            />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse className="ms-3" id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
          <Nav.Link to="/venues" as={NavLink}>Venues</Nav.Link>
        </Nav>
        <Nav className="me-3">
          <Nav.Link href="#deets">More deets</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            Dank memes
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
