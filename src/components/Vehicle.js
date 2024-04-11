import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Button, Modal, Table, Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [registrationPlate, setRegistrationPlate] = useState('');
  const [destination, setDestination] = useState('');
  const [status, setStatus] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  let token = localStorage.getItem('token');

  const fetchVehicles = useCallback(async () => {
    try {
      const response = await axios.get('https://geospatial-analysis-zyqi.onrender.com/vehicles', { headers: { Authorization: token } });
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  }, [token]);

  const fetchStatusOptions = useCallback(async () => {
    try {
      const response = await axios.get('https://geospatial-analysis-zyqi.onrender.com/vehiclestatuses', { headers: { Authorization: token } });
      setStatusOptions(response.data);
    } catch (error) {
      console.error('Error fetching status options:', error);
    }
  }, [token]);

  const fetchDestinationOptions = useCallback(async () => {
    try {
      const response = await axios.get('https://geospatial-analysis-zyqi.onrender.com/eta', { headers: { Authorization: token } });
      setDestinationOptions(response.data);
    } catch (error) {
      console.error('Error fetching destination options:', error);
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchVehicles();
      await fetchStatusOptions();
      await fetchDestinationOptions();
    };

    fetchData();
  }, [fetchVehicles, fetchStatusOptions, fetchDestinationOptions]);

  const handleSaveVehicle = async (e) => {
    e.preventDefault();

    if (!registrationPlate || !destination || !status) {
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

      const response = await axios.post('https://geospatial-analysis-zyqi.onrender.com/registervehicles', {
        registration_plate: registrationPlate,
        destination: destination,
        status: status,
      }, { headers: headers });

      console.log('Vehicle saved successfully:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Save Successful',
        text: 'Vehicle saved successfully!',
      });

      setRegistrationPlate('');
      setDestination('');
      setStatus('');

      fetchVehicles();
    } catch (error) {
      console.error('Error saving vehicle:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Save Failed',
        text: 'Failed to save vehicle. Please try again later.',
      });
    }
  };

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

  return (
    <>
      <div className='container'>
        <br />
        <div className='col-12'>
          <Button variant='btn btn-success mb-2 float-end btn-sm me-2' onClick={handleShowCreateModal}>
            Add Vehicle
          </Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Registration Plate</th>
              <th>Destination</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.length > 0 &&
              vehicles.slice(0, 10).map((row, key) => (
                <tr key={key}>
                  <td>{row.vehicle_id}</td>
                  <td>{row.registration_plate}</td>
                  <td>{row.destination}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Add Vehicle</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSaveVehicle}>
            <Row>
              <Col>
                <Form.Group controlId='registrationPlate'>
                  <Form.Label>Registration Plate</Form.Label>
                  <Form.Control type='text' value={registrationPlate} onChange={(event) => setRegistrationPlate(event.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId='destination'>
                  <Form.Label>Destination</Form.Label>
                  <Form.Control as='select' value={destination} onChange={(event) => setDestination(event.target.value)}>
                    <option value=''>Select Destination</option>
                    {destinationOptions.map((option) => (
                      <option key={option.vehicle_id} value={option.destination}>
                        {option.destination}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId='status'>
                  <Form.Label>Status</Form.Label>
                  <Form.Control as='select' value={status} onChange={(event) => setStatus(event.target.value)}>
                    <option value=''>Select Status</option>
                    {statusOptions.map((option) => (
                      <option key={option.vehicle_id} value={option.status}>
                        {option.status}
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
    </>
  );
};
