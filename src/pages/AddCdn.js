import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Breadcrumb, Card, Container, Form, Row, Col } from '@themesberg/react-bootstrap';
import React from 'react'
import { useState } from 'react';
import { showToast } from '../utils/helpers';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddCdn = () => {

    const [cdn, setCdn] = useState("")
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!cdn) {
            showToast("Please enter a cdn", "error")
            return
        }

        setLoading(true);
        axios.post(`${process.env.REACT_APP_API_URL}/api/cdn`, { cdn }).then(() => {
            showToast("Cdn added successfully");
            setLoading(false);
            history.push('/cdns');
        }).catch((error) => {
            setLoading(false);
            showToast("An error occured while adding the cdn.", "error")
            console.error(error);
        })
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Cdns</Breadcrumb.Item>
                        <Breadcrumb.Item active>Add</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Add New Cdn</h4>
                </div>
            </div>
            <div>
                <Row>
                    <Col sm={6}>
                        <Card className='px-3 py-5'>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>CDN</Form.Label>
                                    <Form.Control type="text" placeholder="Enter cdn" onChange={(e) => setCdn(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3 mt-3">
                                    <Button type='submit' className='px-3' disabled={loading} color='info'>{loading ? 'Adding...' : 'Add'}</Button>
                                </Form.Group>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default AddCdn