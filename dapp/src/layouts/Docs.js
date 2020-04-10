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
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthFooter from "components/Footers/AuthFooter.js";
import routes from "routes.js";

class Docs extends React.Component {
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/docs") { 
        return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
        ) 
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <div className="main-content">          
          <div className="header py-7 ">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    {""}
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Switch>
                {this.getRoutes(routes)}
                <Redirect from="*" to="/" />
              </Switch>
            </Row>
          </Container>
        </div>
        <AuthFooter />
      </>
    );
  }
}

export default Docs;
