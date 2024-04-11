import React, { useState } from "react";
import axios from 'axios';
import { Form, FormGroup, FormControl, Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import signup from '../assets/sign.svg';
import NavBar from "./Navbar";

const Signin = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://geospatial-analysis-zyqi.onrender.com/register', {
                name,
                username,
                email,
                password,
                role_id: 2 // Set role_id to default value 2
            });
            console.log('Signin successful:', response.data);
        } catch (error) {
            console.error('Signin failed:', error);
            setError('Failed to sign in. Please try again later.');
            // Handle signin failure, e.g., display error message
        }
    };

    return (
        <>
            <NavBar />
            <Container fluid className='p-4' style={{ marginTop: '-100px' }}>
                <Row>
                    <Col md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                        <img src={signup} alt="SignUp" className="img-fluid" />
                    </Col>
                    <Col md='6' className='d-flex align-items-center'>
                        <Card className='my-5 w-75 mx-auto'>
                            <div className='card-body p-5'>
                                <Form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <h3 className="my-4 text-center text-primary" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                                            SIGN UP<br />
                                            <span className="text-secondary" style={{ fontSize: '1rem', fontWeight: 'normal', lineHeight: '1', display: 'inline-block' }}>
                                                Please enter your details!
                                            </span>
                                        </h3>
                                    </div>
                                    <FormGroup className='mb-4'>
                                        <Form.Group className="input-group">
                                            <span className="input-group-text">
                                                <FaUser />
                                            </span>
                                            <FormControl type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                                        </Form.Group>
                                    </FormGroup>
                                    <FormGroup className='mb-4'>
                                        <Form.Group className="input-group">
                                            <span className="input-group-text">
                                                <FaUser />
                                            </span>
                                            <FormControl type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                                        </Form.Group>
                                    </FormGroup>
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
                                    <Button type='submit' variant='primary' size='lg' className={`w-100`} disabled={false}>
                                        Sign Up
                                    </Button>
                                </Form>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Signin;
