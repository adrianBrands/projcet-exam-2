import { Button, Container, Nav, Navbar, NavbarBrand, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../images/holidaze1.png"


/*export default function Header() {
 
  return ( 
    <Navbar sticky="top" className="bg-white shadow-sm mb-3 border-bottom border-primary">
      <Container>
      
       <div className="d-flex flex-column align-items-center justify-content-center">
        <NavbarBrand href="/">Holidaze</NavbarBrand>
        <p className="border-top">Your next Space</p>
       </div> 
      
        <Nav className=" fs-5">
        
          <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
          <Nav.Link to="/contact" as={NavLink}>Contact</Nav.Link>
        </Nav>
        
        
        <div>hell9</div>
      </Container>
    </Navbar>
  );
}*/

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className="border-bottom border-primary d-flex">
      <Navbar.Brand className="ms-3"  href="#home">
        <img
              src={Logo}
              width="250"
              height="75"
              
              alt="holidaze logo"
            />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="ms-3" id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#features">Home</Nav.Link>
          <Nav.Link href="#pricing">Venues</Nav.Link>
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
