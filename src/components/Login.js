import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, FormControl, Button, Container, Row, Col } from "react-bootstrap";
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import NavBar from "./Navbar";
import styles from '../styles/Navbar.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://geospatial-analysis-zyqi.onrender.com/login', {
                email,
                password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
            navigate("/dashboard");
        } catch (error) {
            console.error('Login failed', error);
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        return null;
    }

    return (
        <>
        <NavBar />
        <Container fluid className='p-4' style={{ marginTop: '-50px' }}>
            <Row>
                <Col md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                    <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                        Welcome back <br />
                        <span className="text-primary">to our platform</span>
                    </h1>
                    <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
                    Unleash the Power of Precision: Tracking Heroes - Your Trusted Partner in Vehicle Location Solutions!
                    </p>
                </Col>
                <Col md='6' className='d-flex align-items-center'>
                    <div className='card my-5 w-75 mx-auto'>
                        <div className='card-body p-5'>
                            <Form onSubmit={handleLogin}>
                                <div className="mb-4">
                                    <h3 className="my-5 text-center text-primary" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                                        LOGIN <br />
                                        <span className="text-secondary" style={{ fontSize: '1rem', fontWeight: 'normal', lineHeight: '1', display: 'inline-block' }}>
                                            Please enter your email and password!
                                        </span>
                                    </h3>
                                </div>
                                <FormGroup className='mb-4'>
                                    <Form.Group className="input-group">
                                        <span className="input-group-text">
                                            <FaUser />
                                        </span>
                                        <FormControl type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                                    </Form.Group>
                                </FormGroup>
                                <FormGroup className='mb-4'>
                                    <Form.Group className="input-group">
                                        <span className="input-group-text">
                                            <FaLock />
                                        </span>
                                        <FormControl type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                                        <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </Button>
                                    </Form.Group>
                                </FormGroup>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <Button type='submit' variant='primary' size='lg' className={`w-100 ${styles.shadowPrimary}`} disabled={loading}>
                                    {loading ? 'Loading...' : 'Login'}
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default Login;
