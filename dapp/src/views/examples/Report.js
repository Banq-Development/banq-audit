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
import Web3 from "web3";

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
  Col,
} from "reactstrap";

let web3 = "";
class Report extends React.Component {
  constructor(props) {    
    super(props);
    this.handleChangeReport = this.handleChangeReport.bind(this);
    this.handleChangeLink = this.handleChangeLink.bind(this);
    this.handleChangeID = this.handleChangeID.bind(this);
    this.handleChangeBug = this.handleChangeBug.bind(this);
    this.state = {
      networkID: 0,
      unlocked: "",
      web3Available: false,
      instanceBanqAudit: "",
      ReportID: "",
      BugLink: "",
      BugID: "",
      Bugclaim: "",
      agree: false,
    }
  }
  componentDidMount() {
    this.startWeb3();
  }
  handleChangeReport(e) {
    this.setState({ReportID: e.target.value});
  }
  handleChangeLink(e) {
    this.setState({BugLink: e.target.value});
  }
  handleChangeID(e) {
    this.setState({BugID: e.target.value});
  }
  handleChangeBug(e) {
    this.setState({Bugclaim: e.target.value});
  }
  handleChangePolicy() {
    if (this.state.agree === false) {
      this.setState({agree: true});
    } else {
      this.setState({agree: false});
    }
  }
  async startWeb3 () {
    if (window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
      web3 = new Web3(window.ethereum);
      web3.eth.net.getId().then(netId => this.setState({networkID: netId}));
        try {
          window.ethereum.enable().then(
            result => this.setState({unlocked: result}),
            await this.setState({web3Available: true}))
      } catch(e) {console.log("web3 blocked")} 
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
      web3.eth.net.getId().then(netId => this.setState({networkID: netId}));
      this.setState({web3Available: true}); 
    }
    // Non-DApp Browsers
    else {
      this.setState({metamask: false});
    }
    this.getWeb3Data();
  }
  async getWeb3Data () {
    const instanceBanqAudit = require("../../components/web3/BanqAudit.json");
    const addressBanqAudit = "0x777DEFE54A17C2A2534E05961e38556F93C56A35";
    if (web3 !== '') {
      await this.setState({instanceBanqAudit: await new web3.eth.Contract(instanceBanqAudit.abi,
      addressBanqAudit)});
    }    
  }
  async sendReport (bytes, _bytes, link, id, claim, agree) {
    if (this.state.instanceBanqAudit !== '' && agree === true) {
      let coinbase = await web3.eth.getCoinbase();
      let id_array = id.split(',');
      let length_id = id_array.length;
      if (length_id < 10) {
        let i = 0;
        while (i < 10 - length_id)  {
          id_array.push("0");
          i++;
        }
      }
      let claim_array = claim.split(',');
      let claim_length = claim_array.length;
      if (claim_length < 10) {
        let i = 0;
        while (i < 10 - claim_length)  {
          claim_array.push("0");
          i++;
        }
      }
      //Web3 calls for total values on loading
      await this.state.instanceBanqAudit.methods.SubmitReport(
                                                    bytes,
                                                    _bytes,
                                                    link,
                                                    id_array,
                                                    claim_array
                                                  ).send({from: coinbase});
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
                  <i className="fas fa-file-code" />
                </div>
              </div>
              <div className="text-center text-muted mb-4">
                Submit report for audit ID <a href="/" className="text-primary">{this.props.match.params.id}</a>
              </div>
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
                    <Input readOnly value={" "+this.props.match.params.bytes} type="text"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-badge" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Report ID" 
                      type="text"
                      onChange={this.handleChangeReport}
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
                      placeholder="Report link" 
                      type="text"
                      onChange={this.handleChangeLink}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-bug" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Bug id's" 
                      type="text"
                      onChange={this.handleChangeID}
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
                      placeholder="Bug claim" 
                      type="text"
                      onChange={this.handleChangeBug}
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
                    onClick={() => this.sendReport(
                                      this.props.match.params.bytes,
                                      this.state.ReportID,
                                      this.state.BugLink,
                                      this.state.BugID,
                                      this.state.Bugclaim,
                                      this.state.agree
                    )}
                  >
                    Submit report
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

export default Report;
