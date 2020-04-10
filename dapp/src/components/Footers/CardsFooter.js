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
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class CardsFooter extends React.Component {
  render() {
    return (
      <>
        <footer className="footer has-cards">
          <Container>
            <Row className="row-grid align-items-center my-md">
              <Col lg="6">
                <h3 className="text-primary font-weight-light mb-2">
                  Check out the source code on our github page!
                </h3>
                <h4 className="mb-0 font-weight-light">
                  If you have comments or would like to contribute. Please contact us.
                </h4>
              </Col>
              <Col className="text-lg-right text-center btn-wrapper" lg="6">
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="github"
                  href="https://github.com/keviinfoes/Banq_audit"
                  id="tooltip495507257"
                  target="_blank"
                > 
                  <i className="fa fa-github" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip495507257">
                  Source code on Github
                </UncontrolledTooltip>
              </Col>
            </Row>
            <hr />
            <Row className="align-items-center justify-content-md-between">
              <Col md="6">
                <div className="copyright text-center text-xl-left text-muted">
                  BANQ •{" "}
                  <a
                    className="font-weight-bold ml-1"
                    href=""
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Audit
                  </a>
                </div>
              </Col>
              <Col md="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>
                    <NavLink
                      href="https://github.com/keviinfoes/Banq_audit/blob/master/LICENSE"
                      target="_blank"
                    >
                      License
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default CardsFooter;
