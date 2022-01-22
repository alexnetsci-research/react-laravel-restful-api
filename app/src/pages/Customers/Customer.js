import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class Customer extends Component {
    state = {
        customers: [],
        loading: true
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:8000/api/customers');

        if (res.data.status === 200) {
            this.setState({
                customers: res.data.customers,
                loading: false,
            });
        }
    }

    render() {

        let customer_data_table = '';

        if (this.state.loading) {
            customer_data_table = <tr><td colSpan={5}>Loading...</td></tr>
        } else {
            customer_data_table =
                this.state.customers.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                            <td>
                                <Link to={`/edit-customer/${item.id}`} className='btn btn-primary btn-sm'>Edit</Link>
                            </td>
                            <td>
                                <Button type="button" variant="danger btn-sm">Delete</Button>
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
                                <h3>Customer Data
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
}

export default Customer;