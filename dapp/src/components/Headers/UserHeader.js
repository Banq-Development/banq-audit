/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

class UserHeader extends React.Component {
  closebutton() {
    if (this.props.owner !== undefined && this.props.coinbase !== undefined){
      let owner = this.props.owner;
      let coinbase = this.props.coinbase;
      let closed = this.props.closed;
      if (owner === coinbase && closed !== true){    
        return (
          <Button
            color="danger"
            href="#pablo"
            onClick={() => this.props.closeAudit(this.props.bytes)}
          >
            Close audit
          </Button>
        );
      }
    } else {
      return (<div />);
    }
  }
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">Details Audit</h1>
                <p className="text-white mt-0 mb-5">
                  This is the detail page of the audit. The owner of the audit
                  can update and close the audit here.
                </p>
                
                {this.closebutton()}
                
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default UserHeader;
