import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import onMarkerIcon from "../assets/img/icons/on_marker.png";
import offMarkerIcon from "../assets/img/icons/off_marker.png";
import axios from "axios";
import { data } from './data'
import { showToast } from "../utils/helpers";
import { useHistory } from "react-router-dom";
import { Card, Table } from '@themesberg/react-bootstrap';
import { LocationsTable } from "../components/Tables";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default () => {

    const history = useHistory()

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [map, setMap] = useState(null);
    const [selectedLocations, setSelectedLocations] = useState([]);

    const [enableGlobalLoading, setEnableGlobalLoading] = useState(true)
    const [enableGlobal, setEnableGlobal] = useState(false)

    const handleMapLoad = (map) => {
        setMap(map);
    };

    const handleMarkerClick = (index) => {
        const updatedLocations = [...selectedLocations];
        const updatedLocation = updatedLocations[index];
        updatedLocation.isAllowed = !updatedLocation.isAllowed;

        // Update the isAllowed value in the backend API
        axios.patch(`${process.env.REACT_APP_API_URL}/api/stream/location/${updatedLocation._id}`, { isAllowed: updatedLocation.isAllowed })
            .then((response) => {
                setSelectedLocations(updatedLocations);
                showToast("Straming location updated successfully!")
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {

        // if (!localStorage.getItem('token')) {
        //     history.replace('/sign-in')
        // }

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stream`);
                const geoFenceRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/global/648cc66de5953f48377d637a`);

                setSelectedLocations(response.data?.data);

                setEnableGlobalLoading(false)
                setEnableGlobal(geoFenceRes.data?.isGeofenceEnabled)

                setLoading(false);
            } catch (error) {
                setEnableGlobalLoading(false)
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleToggleGeofence = (e) => {
        try {
            setEnableGlobalLoading(true)
            axios.put(`${process.env.REACT_APP_API_URL}/api/global/648cc66de5953f48377d637a`, { isGeofenceEnabled: e.target.checked }).then(res => {
                setEnableGlobal(res.data?.isGeofenceEnabled)
                setEnableGlobalLoading(false)
                showToast('Geofencing settings updated successfully!')
            }).catch(err => {
                setEnableGlobalLoading(false)
                showToast(err.message, "error")
            })

        } catch (error) {
            showToast(error.message, "error")
            setEnableGlobalLoading(false)
        }
    }

    if (loading || selectedLocations.length <= 0) return <h5>Loading...</h5>

    if (error) return <h5>An error occured while loading the map</h5>

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Location</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Location</h4>
                </div>
                <Button className="btn-sm" color="success" href="/locations/add">Add location</Button>
            </div>

            {/* {enableGlobal ? <div style={{ height: "70vh", width: "100%" }}>
                <LoadScript googleMapsApiKey={apiKey}>
                    <GoogleMap
                        mapContainerStyle={{ height: "100%", width: "100%" }}
                        onLoad={handleMapLoad}
                        center={{ lat: 31.9686, lng: -99.9018 }} // Center of Texas
                        zoom={6}
                    >
                        //  Render markers for each selected location 
                        {selectedLocations?.map((location, index) => (
                            <Marker
                                key={index}
                                position={{ lat: Number(location.lat), lng: Number(location.lng) }}
                                onClick={() => handleMarkerClick(index)}
                                icon={{
                                    url: location.isAllowed ? onMarkerIcon : offMarkerIcon,
                                    scaledSize: { width: 32, height: 32 },
                                }}
                            />
                        ))}
                    </GoogleMap>
                </LoadScript>
            </div> : null} */}

            {enableGlobal ?
                <LocationsTable locations={selectedLocations} handleMarkerClick={handleMarkerClick} />
                : null}



            <div style={{ marginTop: '40px', marginBottom: '80px' }}>
                <h5>Enable Geofencing</h5>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Enable/Disable Geofencing"
                    disabled={enableGlobalLoading}
                    checked={enableGlobal}
                    onChange={handleToggleGeofence}
                    style={{ cursor: "pointer" }}
                />
            </div>
        </>
    );
};
