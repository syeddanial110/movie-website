import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Breadcrumb, Card, Form, Row, Col, } from '@themesberg/react-bootstrap';
import React from 'react'
import { useState } from 'react';
import { showToast } from '../utils/helpers';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddStream = () => {

    const [county, setCounty] = useState("")
    const [isAllowed, setIsAllowed] = useState(false)
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!county) {
            showToast("Please enter a county", "error")
            return
        }

        setLoading(true);
        axios.post(`${process.env.REACT_APP_API_URL}/api/stream`, { county, isAllowed, lng: 0, lat: 0 }).then(() => {
            showToast("Location added successfully");
            setCounty('');
            setIsAllowed(false);
            setLoading(false);
            history.push('/locations');
        }).catch((error) => {
            setLoading(false);
            setCounty('');
            setIsAllowed(false);
            showToast(error?.response?.data?.error || error?.message || "An error occured while adding the location.", "error")
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
                        <Breadcrumb.Item active>Location</Breadcrumb.Item>
                        <Breadcrumb.Item active>Add</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Add New Location</h4>
                </div>
            </div>
            <div>
                <Row>
                    <Col sm={6}>
                        <Card className='px-3 py-5'>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>County</Form.Label>
                                    <Form.Control type="text" placeholder="Enter county" onChange={(e) => setCounty(e.target.value)} />
                                    <Form.Check
                                        className='mt-4 mb-4'
                                        type={'switch'}
                                        checked={isAllowed}
                                        onClick={() => setIsAllowed(!isAllowed)}
                                        label={`isAllowed`}
                                    />
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

export default AddStream