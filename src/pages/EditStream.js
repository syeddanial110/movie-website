import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Breadcrumb, Card, Form, Row, Col } from '@themesberg/react-bootstrap';
import React from 'react'
import { useState } from 'react';
import { showToast } from '../utils/helpers';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const EditStream = () => {

    const [county, setCounty] = useState("")
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const { id } = useParams()

    useEffect(() => {
        const getLocation = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/stream/${id}`)
                setCounty(res.data?.county)
            } catch (error) {
                console.error(error);
            }
        }

        getLocation();
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!county) {
            showToast("Please enter a county", "error")
            return
        }

        setLoading(true);
        axios.put(`${process.env.REACT_APP_API_URL}/api/stream/${id}`, { county }).then(() => {
            showToast("County updated successfully");
            setLoading(false);
            setCounty('');
            history.push('/locations');
        }).catch((error) => {
            setLoading(false);
            setCounty('');
            showToast("An error occured while updating the county.", "error")
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
                    <h4>Edit Location</h4>
                </div>
            </div>
            <div>
                <Row>
                    <Col sm={6}>
                        <Card className='px-3 py-5'>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>County</Form.Label>
                                    <Form.Control type="text" value={county} placeholder="Enter county" onChange={(e) => setCounty(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3 mt-3">
                                    <Button type='submit' className='px-3' disabled={loading} color='info'>{loading ? 'Saving...' : 'Save'}</Button>
                                </Form.Group>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default EditStream