/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

class Download extends React.Component {
  render() {
    return (
      <>
        <section className="section section-lg">
          <Container>
            <Row className="row-grid justify-content-center">
              <Col className="text-center" lg="8">
                <h2 className="display-3">
                  The audit marketplace
                  <span className="text-success small">
                    To support the continued development of the system a small 
                    fee of 0.3% is applied
                  </span>
                </h2>
                <p className="lead">
                  
                </p>
                <div className="btn-wrapper">
                  <Button
                    className="mb-3 mb-sm-0"
                    color="primary"
                    href="/auth/request"
                  >
                    Request audit
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default Download;
