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
import { Link } from "react-router-dom";

// reactstrap components
import {
  //Alert,
  Navbar,
  Container,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from "reactstrap";

class AdminNavbar extends React.Component {
  constructor(props) {    
    super(props);
    this.handleChangeAudit = this.handleChangeAudit.bind(this);
    this.state = {
      AuditBytes: "",
    }
  }
  handleChangeAudit(e) {
    this.setState({AuditBytes: e.target.value});
  }
  handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.getAudit(this.state.AuditBytes);
    }
  }
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/admin/index"
            >
              {this.props.brandText}
            </Link>
	    {/*
            <Alert color="default" className="ml-lg-auto">
              <strong>Beta!</strong> This is a beta release on the ropsten testnet,
              get test ether <a className="text-primary" href="https://faucet.metamask.io/">here</a>
            </Alert>
	    */}
            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input 
                    placeholder="Search audits" 
                    type="text" 
                    onChange={this.handleChangeAudit}
                    onKeyDown={this.handleKeyDown}
                  />                  
                </InputGroup>
              </FormGroup>
            </Form>  
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
