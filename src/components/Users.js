import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Table, Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role_id, setRoleID] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  let token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://geospatial-analysis-zyqi.onrender.com/users', { headers: { Authorization: token } });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://geospatial-analysis-zyqi.onrender.com/roles', { headers: { Authorization: token } });
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();

    if (!name || !username || !password || !role_id) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: token,
      };

      const response = await axios.post('https://geospatial-analysis-zyqi.onrender.com/register', {
        name: name,
        username: username,
        password: password,
        role_id: role_id,
      }, { headers: headers });

      console.log('User registered successfully:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'User registered successfully!',
      });

      setName('');
      setUsername('');
      setPassword('');
      setRoleID('');

      fetchUsers();
    } catch (error) {
      console.error('Error registering user:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Failed to register user. Please try again later.',
      });
    }
  };

  const handleUpdateUser = async () => {
    try {
      if (!name || !username || !role_id || !userIdToUpdate) {
        throw new Error('Missing required fields');
      }
  
      const headers = {
        'Content-Type': 'application/json',
        Authorization: token,
      };
  
      const userData = {
        name: name,
        username: username,
        role_id: role_id,
      };
  
      // Include password only if it's not empty
      if (password) {
        userData.password = password;
      }
  
      const response = await axios.put(`https://geospatial-analysis-zyqi.onrender.com/users/${userIdToUpdate}`, userData, { headers: headers });
  
      console.log('User updated successfully:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Update Successful',
        text: 'User updated successfully!',
      });
  
      setName('');
      setUsername('');
      setPassword('');
      setRoleID('');
      setUserIdToUpdate(null);
  
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Failed to update user. Please try again later.',
      });
    }
  };
  

  const deleteUser = async (id) => {
    const isConfirm = await Swal.fire({
      title: 'Are you sure you want to delete?',
      text: "You won't be able to revert this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    try {
      await axios.delete(`https://geospatial-analysis-zyqi.onrender.com/deleteuser/${id}`, { headers: { Authorization: token } });
      Swal.fire({
        icon: 'success',
        text: 'Successfully Deleted',
      });
      fetchUsers();
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: 'error',
      });
    }
  };

  const updateUser = (user) => {
    setUserIdToUpdate(user.user_id);
    setName(user.name);
    setUsername(user.username);
    setPassword(user.password);
    setRoleID(user.role_id);
    setShowUpdateModal(true);
  };

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleShowUpdateModal = () => setShowUpdateModal(true);

  return (
    <>
      <div className='container'>
        <br />
        <div className='col-12'>
          <Button variant='btn btn-success mb-2 float-end btn-sm me-2' onClick={handleShowCreateModal}>
            Create User
          </Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 &&
              users.slice(0, 10).map((row, key) => (
                <tr key={key}>
                  <td>{row.user_id}</td>
                  <td>{row.name}</td>
                  <td>{row.username}</td>
                  <td>
                    <Button className='btn btn-danger btn-sm' onClick={() => deleteUser(row.id)}>
                      Delete
                    </Button>
                    <Button className='btn btn-primary btn-sm ms-2' onClick={() => updateUser(row)}>
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSaveUser}>
            <Row>
              <Col>
                <Form.Group controlId='Name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='text' value={name} onChange={(event) => setName(event.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId='Username'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type='text' value={username} onChange={(event) => setUsername(event.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId='Password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId='Role'>
                  <Form.Label>Role</Form.Label>
                  <Form.Control as='select' value={role_id} onChange={(event) => setRoleID(event.target.value)}>
                    <option value=''>Select Role</option>
                    {roles.map((role) => (
                      <option key={role.role_id} value={role.role_id}>
                        {role.role_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Button variant='primary' className='mt-2' size='sm' block='block' type='submit'>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleUpdateUser}>
            <Row>
              <Col>
                <Form.Group controlId='Name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='text' value={name} onChange={(event) => setName(event.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId='Username'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type='text' value={username} onChange={(event) => setUsername(event.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId='Password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId='Role'>
                  <Form.Label>Role</Form.Label>
                  <Form.Control as='select' value={role_id} onChange={(event) => setRoleID(event.target.value)}>
                    <option value=''>Select Role</option>
                    {roles.map((role) => (
                      <option key={role.role_id} value={role.role_id}>
                        {role.role_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Button variant='primary' className='mt-2' size='sm' block='block' type='submit'>
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
