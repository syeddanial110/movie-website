
import React from "react";
import moment from "moment-timezone";
import { Row, Col } from '@themesberg/react-bootstrap';

export default (props) => {
  const currentYear = moment().get("year");

  return (
    <div style={{marginTop: '50px'}}>
      <footer className="footer py-5">
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              Copyright © 2019-{`${currentYear} `}
            </p>
          </Col>
          <Col xs={12} lg={6}>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
