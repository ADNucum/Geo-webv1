import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/Group 5 1.png'; // Import SVG file
import styles from '../styles/Navbar.module.css';

const NavBar = () => {
  return (
    <Navbar expand="xl" className={styles.navbar}>
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img 
            src={logo} // Use imported SVG file
            width="50"
            height="50"
            alt="Logo"
            style={{fill: 'black'}}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='me-auto'>
            {/* <Nav.Link as={NavLink} to="/" className={styles.navLink}>
              Home
            </Nav.Link> */}
            {/* <Nav.Link as={NavLink} to="/about" className={styles.navLink}>
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/education" className={styles.navLink}>
              Education
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className={styles.navLink}>
              Contact
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
