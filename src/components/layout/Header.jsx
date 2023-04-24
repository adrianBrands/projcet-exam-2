import { Nav, Navbar, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../images/holidaze1.png"
import { FaUserAlt } from "react-icons/fa";
import LoggedIn from "../profile/IsLoggedIn";



export default function Header() {
  


  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className=" border-primary d-flex shadow-sm" sticky="top">
      <Navbar.Brand className="ms-3"  href="/">
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
        <Nav className="me-3 align-items-center">
          <Dropdown className="dropstart">
          <Dropdown.Toggle  variant="" id="dropdown-basic">
            <FaUserAlt className="userIcon"/>
          </Dropdown.Toggle>
          
            <LoggedIn />
          
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
