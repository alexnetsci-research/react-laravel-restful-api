import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AddCustomer() {
    const navigate = useNavigate();
    const [customerInput, setCustomer] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });

    const handleInput = (e) => {
        e.persist();
        setCustomer({ ...customerInput, [e.target.name]: e.target.value })                  
    }

    const submit = (e) => {
        e.preventDefault();

        const data = {
            first_name: customerInput.first_name,
            last_name: customerInput.last_name,
            email: customerInput.email,
        }

        axios.post(`api/customers`, data).then(res => {

            if (res.data.status === 200) {
                swal('Success!', res.data.message, 'success');
                setCustomer({
                    first_name: '',
                    last_name: '',
                    email: '',
                });
                navigate('/customers', { replace: true });
            } else if (res.data.status === 422) {
                setCustomer({ ...customerInput, error_list: res.data.validate_err });
            }
        });
    }

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col md={9}>
                    <Card>
                        <Card.Header>
                            <h3>Add Customer
                                <Link to={'/customers'} className='btn btn-secondary btn-sm float-end'>Back</Link>
                            </h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={submit}>
                                <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                    <Form.Control type='text' name='first_name' onChange={handleInput} value={customerInput.first_name} placeholder='First name' />
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                    <Form.Control type='text' name='last_name' onChange={handleInput} value={customerInput.last_name} placeholder='Last name' />
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                    <Form.Control type='email' name='email' onChange={handleInput} value={customerInput.email} placeholder='Email address' />
                                </Form.Group>

                                <Form.Group>
                                    <Button type='submit' variant='success btn-sm'>Submit</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AddCustomer;
