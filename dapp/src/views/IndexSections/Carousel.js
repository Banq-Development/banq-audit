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

// reactstrap components
import { Button, Container, Row, Col, UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src: require("../../assets/img_2/theme/marketplace_page.png"),
    altText: "",
    caption: "",
    header: ""
  },
  {
    src: require("../../assets/img_2/theme/detail_audit_page.png"),
    altText: "",
    caption: "",
    header: ""
  }
];
class Carousel extends React.Component {
  render() {
    return (
      <>
        <section className="section section-components pb-0" id="section-components"/>
        <section className="section section-components">
          <div className="shape shape-style-1 shape-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="py-md">
            <Row className="justify-content-between align-items-center">
              <Col className="mb-5 mb-lg-0" lg="5">
                <h1 className="font-weight-light">
                  Marketplace overview
                </h1>
                <p className="lead mt-4">
                  The audit marketplace shows all currently open audits. 
                  Auditors can view details and submit reports to claim rewards.
                </p>
                <Button
                      color="primary"
                      href="/admin/index"
                      target="_blank"
                >
                  <span className="nav-link-inner--text">Marketplace</span>
                </Button>
              </Col>
              <Col className="mb-lg-auto" lg="6">
                <div 
                  className="rounded  overflow-hidden transform-perspective-right"
                >
                  <UncontrolledCarousel items={items} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-components pb-0" id="section-components"/>
      </>
    );
  }
}

export default Carousel;
