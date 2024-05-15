import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

import { TransactionsTable } from "../components/Tables";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default () => {

  const [cdns, setCdns] = useState([])
  const [loading, setLoading] = useState(true)

  const history = useHistory()

  useEffect(() => {

    try {

      // if (!localStorage.getItem('token')) {
      //   history.replace('/sign-in')
      //   return false
      // }

    } catch (error) {
      console.error(error);
    }

    try {
      // Fetch the selected locations from the API
      axios.get(`${process.env.REACT_APP_API_URL}/api/cdn`)
        .then((response) => {
          setCdns(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  // if (loading) return <h5>Loading...</h5>

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Cdns</Breadcrumb.Item>
          </Breadcrumb>
          <h4>CDNs</h4>
        </div>
        <Button className="btn-sm" color="success" href="/cdns/add">Add Cdn</Button>
      </div>
      <TransactionsTable cdn={cdns} />
    </>
  );
};
