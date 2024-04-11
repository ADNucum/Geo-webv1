import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Navbar, Nav, Button, Container, Col } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/Group 5 1.png';
import styles from '../styles/Navbar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Users } from "./Users";
import { Vehicles } from "./Vehicle";

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }
                const decodedToken = jwtDecode(token);
                setUserInfo(decodedToken);
            } catch (error) {
                console.error('Error fetching user:', error);
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            setUserInfo(null);
            navigate("/login");
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
    <>
        <Navbar expand="xl" className={styles.navbar}>
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    <img 
                        src={logo}
                        width="155"
                        height="85"
                        alt="Logo"
                        style={{ fill: 'black' }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='me-auto'>
                        <Nav.Link as={NavLink} to="/" className={styles.navLink}>
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/users" className={styles.navLink}>
                            Users
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/vehicles" className={styles.navLink}>
                            Vehicles
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/contact" className={styles.navLink}>
                            
                        </Nav.Link>
                    </Nav>
                    <Col className="d-flex align-items-center justify-content-end">
                        <Navbar.Text>
                            <FontAwesomeIcon icon={faUser} className="me-2" />
                            {userInfo ? (userInfo.email || 'Email') : 'Loading...'}
                        </Navbar.Text>
                        <Button variant="secondary" onClick={handleLogout} className="ms-3">Logout</Button>
                    </Col>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <div>
            <Users/>
        </div>
        <div>
            <Vehicles/>
        </div>
        </>
    );
};

export default Dashboard;
