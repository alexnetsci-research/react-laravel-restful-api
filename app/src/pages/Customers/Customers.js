import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import swal from 'sweetalert';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        let isMounted = true;
        axios.get('api/customers').then(res => {
            if (isMounted && res.data.status === 200) {
                setCustomers(res.data.customers);
                setLoading(false);
            }
        });
        return () => { isMounted = false };
    }, []);

    const deleteCustomer = (e, id) => {
        e.preventDefault(); 

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`api/customers/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success!", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    let customer_data_table = '';

    if (loading) {
        customer_data_table = <tr><td colSpan={5} className='text-center'>Loading...</td></tr>
    } else if (!customers.length) {
        customer_data_table = <tr><td colSpan={5} className='text-center'>No customer data yet!</td></tr>
    } else {
        customer_data_table =
            customers.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.email}</td>
                        <td>
                            <Link to={`/edit-customer/${item.id}`} className='btn btn-primary btn-sm'>Edit</Link>
                        </td>
                        <td>
                            <Button type='button' onClick={(e) => deleteCustomer(e, item.id)} variant='danger btn-sm'>Delete</Button>
                        </td>
                    </tr>
                );
            });
    }

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col md={9}>
                    <Card>
                        <Card.Header>
                            <h3>Customers
                                <Link to={'/add-customer'} className='btn btn-success btn-sm float-end'>Add Customer</Link>
                            </h3>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email address</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customer_data_table}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Customers;