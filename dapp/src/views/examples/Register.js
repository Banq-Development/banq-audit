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
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeLink = this.handleChangeLink.bind(this);
    this.handleChangeRiskCritical = this.handleChangeRiskCritical.bind(this);
    this.handleChangeRiskHigh = this.handleChangeRiskHigh.bind(this);
    this.handleChangeRiskMedium = this.handleChangeRiskMedium.bind(this);
    this.handleChangeRiskLow = this.handleChangeRiskLow.bind(this);
    this.handleChangeReward = this.handleChangeReward.bind(this);
    this.state = {
      auditLink: "",
      auditRiskCritical: "",
      auditRiskHigh: "",
      auditRiskMedium: "",
      auditRiskLow: "",
      auditReward: "",
      agree: false,
    };
  }
  handleChangeLink(e) {
    this.setState({auditLink: e.target.value});
  }
  handleChangeRiskCritical(e) {
    this.setState({auditRiskCritical: (e.target.value *10**18).toString()});
  }
  handleChangeRiskHigh(e) {
    this.setState({auditRiskHigh: (e.target.value *10**18).toString()});
  }
  handleChangeRiskMedium(e) {
    this.setState({auditRiskMedium: (e.target.value *10**18).toString()});
  }
  handleChangeRiskLow(e) {
    this.setState({auditRiskLow: (e.target.value *10**18).toString()});
  }
  handleChangeReward(e) {
    this.setState({auditReward: (e.target.value *10**18).toString()});
  }
  handleChangeDescription(e) {
    this.props.getAuditID(e.target.value);
  }
  handleChangePolicy() {
    if (this.state.agree === false) {
      this.setState({agree: true});
    } else {
      this.setState({agree: false});
    }
  }
  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-center mt-2 mb-4">
                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                  <i className="fas fa-file" />
                </div>
              </div>
              <div className="text-center text-muted mb-4">
                Request audit 
              </div>
              <Input
                className="form-control-alternative"
                value={this.props.auditDescription}
                rows="3"
                type="textarea"
                onChange={e => this.handleChangeDescription(e)}
              />
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-badge" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      readOnly
                      value={this.props.auditID}
                      type="text"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Audit link" 
                      type="text"
                      onChange={this.handleChangeLink}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-money-coins" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Reward critical" 
                      type="text"
                      onChange={this.handleChangeRiskCritical}
                    />
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-money-coins" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Reward high" 
                      type="text"
                      onChange={this.handleChangeRiskHigh}
                    />
                  </InputGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-money-coins" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Reward medium" 
                      type="text"
                      onChange={this.handleChangeRiskMedium}
                    />
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-money-coins" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Reward low" 
                      type="text"
                      onChange={this.handleChangeRiskLow}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-money-coins" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Deposit reward" 
                      type="text"
                      onChange={this.handleChangeReward}
                    />
                  </InputGroup>
                </FormGroup>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                        onClick={() => this.handleChangePolicy()}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="/docs/terms" target="_blank">
                            Terms of Service
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button 
                    className="mt-4" 
                    color="primary" 
                    type="button"
                    onClick={() => this.props.requestAudit(
                                      this.props.auditID,
                                      this.state.auditLink,
                                      this.state.auditRiskCritical,
                                      this.state.auditRiskHigh,
                                      this.state.auditRiskMedium,
                                      this.state.auditRiskLow,
                                      this.state.auditReward,
                                      this.state.agree
                    )}
                  >
                    Register audit
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;
