import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditCustomer() {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [customerInput, setCustomer] = useState([]);
    const [errorInput, setError] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/edit-customer/${id}`).then(res => {

            if (res.data.status === 200) {
                setCustomer(res.data.customer);
                setLoading(false);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate("/", { replace: true });
            }
        });

    }, [id, navigate]);

    const handleInput = (e) => {
        e.persist();
        setCustomer({ ...customerInput, [e.target.name]: e.target.value });
    }

    const submit = (e) => {
        e.preventDefault();

        const data = {
            first_name: customerInput.first_name,
            last_name: customerInput.last_name,
            email: customerInput.email,
        }

        axios.put(`http://localhost:8000/api/update-customer/${id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
                navigate("/", { replace: true });
            }
            else if (res.data.status === 422) {
                swal("All fields are mandetory", "", "error");
                setError(res.data.validationErrors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate("/", { replace: true });
            }
        });
    }

    if (loading) {
        return (
            <Container>
                <Row className='justify-content-center'>
                    <Col md={9}>
                        <Card>
                            <Card.Header>
                                <h3>Edit Customer
                                    <Link to={'/'} className='btn btn-secondary btn-sm float-end'>Back</Link>
                                </h3>
                            </Card.Header>
                            <Card.Body>
                                Loading Edit Customer Data...
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col md={9}>
                    <Card>
                        <Card.Header>
                            <h3>Edit Customer
                                <Link to={'/'} className='btn btn-secondary btn-sm float-end'>Back</Link>
                            </h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={submit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" name="first_name" onChange={handleInput} value={customerInput.first_name} placeholder="First name" />
                                    <span className="text-danger">{errorInput.first_name}</span>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" name="last_name" onChange={handleInput} value={customerInput.last_name} placeholder="Last name" />
                                    <span className="text-danger">{errorInput.last_name}</span>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="email" name="email" onChange={handleInput} value={customerInput.email} placeholder="Email address" />
                                    <span className="text-danger">{errorInput.email}</span>
                                </Form.Group>

                                <Form.Group>
                                    <Button type="submit" variant="success btn-sm">Submit</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default EditCustomer;
