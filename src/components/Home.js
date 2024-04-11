import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css';
import hero from '../assets/HeroSection.svg';

const Home = () => {
  const enzoText = "Unleash the Power of Precision";
  const infoText = "Your Trusted Partner in Vehicle Location Solutions!";

  return (
    <Container fluid className="p-0">
      <Row>
        <Col md={6} className="d-flex flex-column justify-content-center align-items-start">
          <div className="mb-0">
            <div className="mb-1">
              <h1 className={styles.Enzo}>{enzoText}</h1>
            </div>
            <h1 className={styles.h1}>{infoText}</h1>
          </div>
          <br/>
          <div className="d-flex">
            <Button size="lg" style={{ 
                color: 'white',
                border: 'none', // No border
                backgroundColor: '#0043d9', // Background color
                marginRight: '10px', // Add space between buttons
                transition: 'background-color 0.3s, color 0.3s, border-color 0.3s' // Smooth transition
              }}>
              <Link to="/login" 
                className="btn-link" 
                style={{ 
                  color: 'white', 
                  textDecoration: 'none' // Remove underline
                }}>Log In</Link>
            </Button>
            <Button size="lg" style={{ 
                color: '#0043d9', // Button text color
                border: '2px solid #0043d9', // Border color
                backgroundColor: 'transparent', // Transparent background
                transition: 'color 0.3s, border-color 0.3s, background-color 0.3s', // Smooth transition
                padding: '10px 20px', // Increase padding
              }}>
              <Link to="/signin" 
                className="btn-link" 
                style={{ 
                  color: '#0043d9', // Link color
                  textDecoration: 'none', // Remove underline
                  '&:hover': {
                    backgroundColor: '#0043d9', // Background color on hover
                    color: 'white', // Text color on hover
                    borderColor: '#0043d9' // Border color on hover
                  }
                }}>Sign Up</Link>
            </Button>
          </div>
        </Col>
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <img src={hero} alt="Logo" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
