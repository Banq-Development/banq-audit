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
import React from "react";
// nodejs library that concatenates classes
import request from "../../assets/img_2/theme/Request_audit_page.png";

// reactstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col
} from "reactstrap";

class Login extends React.Component {
  state = {};
  render() {
    return (
      <>
        <section className="section section-lg section-shaped">
          <div className="shape shape-style-1 shape-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="py-md">
            <Row className="row-grid justify-content-between align-items-center">
            <Col className="mb-lg-auto" lg="5">
                <div className="transform-perspective-right">
                  <Card className="overflow-hidden bg-secondary shadow border-0">
                    <img
                      src={request}
                      alt=""
                      width="100%"
                      height="75%"
                    />
                  </Card>
                </div>
              </Col>
              <Col lg="6">
                <h3 className="display-3 text-white">
                  Audit request {" "}
                  <span className="text-white">As a developer software audits are vital</span>
                </h3>
                <p className="lead text-white">
                  Currently finding an auditor is a non trivial task. 
                  You have to search and request quotes. 
                </p>
                <p className="lead text-white">
                  BANQ • AUDIT lets you request audits and set your own reward, the auditors will
                  find you!
                </p>
                <div className="btn-wrapper">
                  <Button 
                    color="success" 
                    href="https://keviinfoes.gitbook.io/banq-audit/"
                    
                  >
                    Information
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 0 100"
              x="0"
              y="0"
            >
              <polygon className="fill-secondary" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
      </>
    );
  }
}

export default Login;
