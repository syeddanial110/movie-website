import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Breadcrumb, Card, Form, Row, Col } from '@themesberg/react-bootstrap';
import React from 'react'
import { useState } from 'react';
import { showToast } from '../utils/helpers';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const EditCdn = () => {

    const [cdn, setCdn] = useState("")
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const { id } = useParams()

    // useEffect(() => {
    //     const getCdn = async () => {
    //         try {
    //             const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cdn/${id}`)
    //             setCdn(res.data?.cdn)
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }

    //     getCdn()
    // }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!cdn) {
            showToast("Please enter a cdn", "error")
            return
        }

        setLoading(true);
        axios.put(`${process.env.REACT_APP_API_URL}/api/cdn/${id}`, { cdn }).then(() => {
            showToast("Cdn updated successfully");
            setLoading(false);
            history.push('/cdns');
        }).catch((error) => {
            setLoading(false);
            showToast("An error occured while updating the cdn.", "error")
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
                    <h4>Edit Cdn</h4>
                </div>
            </div>
            <div>
                <Row>
                    <Col sm={6}>
                        <Card className='px-3 py-5'>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>CDN</Form.Label>
                                    <Form.Control type="text" value={cdn} placeholder="Enter cdn" onChange={(e) => setCdn(e.target.value)} />
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

export default EditCdn