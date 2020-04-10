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
import Identicon from "identicon.js";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  UncontrolledPopover,
  PopoverBody
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDeposit = this.handleChangeDeposit.bind(this);
    this.handleChangeReceived = this.handleChangeReceived.bind(this);
    this.handleChangeAddition = this.handleChangeAddition.bind(this);
    this.state = {
      addDeposit: (this.props.data_audit_rewards[0]*1 +
                  this.props.data_audit_rewards[1]*1 +
                  this.props.data_audit_rewards[2]*1 +
                  this.props.data_audit_rewards[3]*1 
        ),
      reviewbug: this.props.bug_Risk,
      reviewbug_notreceived: [0,0,0,0,0,0,0,0,0,0],
      reportreceived: true, 
      addition: 0,
    };
  }
  async handleChange (e) {
    e.preventDefault();
    let index_audit = e.target.value;
    this.props.getReport(index_audit);
  }
  handleChangeDeposit(e) {
    this.setState({addDeposit: e.target.value * 10**18});
  }
  handleChangeAddition(e) {
    this.setState({addition: e.target.value});
  }
  handleChangeReview(e, index) {
    let array = this.state.reviewbug;
    for(var i = 0; i < array.length; i++) {
      if (i === index){
        array[i] = e.target.value;
      } else {
        array[i] = this.state.reviewbug[i];
      }
    }
    this.setState({reviewbug: array});
  }
  handleChangeReceived() {
    this.setState({
      reportreceived: !this.state.reportreceived,
    }); 
  }
  respond_auditee () {
    if (this.state.reportreceived === true) {
        this.props.respondReportAuditee(
          this.state.reviewbug,
          this.state.addition,
          this.state.reportreceived
        )
    }
    if (this.state.reportreceived === false) {
      this.props.respondReportAuditee(
        this.state.reviewbug_notreceived,
        this.state.addition,
        this.state.reportreceived
      )
  }
  }
  renderReports (length) {
    var rows = [];
    var start = 0;
    for(var i = start; i < length; i++) {
      rows[i] = (<option value={i} key={i}>{i}</option>)
    };
    return(rows);
  }
  renderReport_buttons () {
    //If coinbase is owner of report
    if (this.props.coinbase === this.props.data_report[0]) {
      if (this.props.data_report[5] === "2") {
        var rows_report_response = (
          <>
          <Button
            id="tooltip876279349"
            className="float-right"
            color="primary"
            href="#pablo"
            onClick={e => e.preventDefault()}
            size="sm"
          >
            Verify response
          </Button>
          <UncontrolledPopover placement="top" target="tooltip876279349">
            <PopoverBody>
              <Button
                color="success"
                href="#pablo"
                onClick={() => this.props.respondReportAuditor(true)}
                size="sm"
              >
                Accept
              </Button>
              <Button
                color="warning"
                href="#pablo"
                onClick={() => this.props.respondReportAuditor(false)}
                size="sm"
              >
                Refuse
              </Button>
            </PopoverBody>
          </UncontrolledPopover>
        </>
        );
        return (rows_report_response);
      } 
      if (this.props.data_report[5] === "1")  {
        var rows_report_close = (
          <Button
            className="float-right"
            color="danger"
            href="#pablo"
            onClick={() => this.props.closeReport()}
            size="sm"
          >
            Close report
          </Button>
        );
        return (rows_report_close);
      } 
    }
    //If coinbase is owner of audit
    if (this.props.coinbase === this.props.data_audit[0] &&
      this.props.data_report[5] === "1") {
      var rows_audit = (
        <Button
            className="float-right"
            color="primary"
            href="#pablo"
            onClick={() => this.respond_auditee()}
            size="sm"
          >
            Respond
        </Button>      
      );
      
      return (rows_audit);
    }
  }
  renderReport_data (total, report, reliability) {
    let response = "";
    if (report[5] === "1") {
      response = "submitted"
    }
    if (report[5] === "2") {
      response = "responded"
    }
    if (report[5] === "3") {
      response = "closed"
    }
    if (total > 0) {
      var rows = (
        <div className="pl-lg-4">
        <Row>
          <Col lg="12">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-username"
              >
                Identifier
              </label>
              <Input
                className="form-control-alternative"
                readOnly
                value={report[2]}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-city"
              >
                Auditor
              </label>
              <Input
                className="form-control-alternative"
              readOnly   
              value={report[0]}
              type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-city"
              >
                Reliability points auditor
              </label>
              <Input
                className="form-control-alternative"
              readOnly   
              value={reliability}
              type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-city"
              >
                Link
              </label>
              <Input
                className="form-control-alternative"
              readOnly   
              value={report[3]}
              type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-last-name"
              >
                Status report
              </label>
              <Input
                className="form-control-alternative"
                readOnly
                value={response}
                type="text"
              />
            </FormGroup>
          </Col> 
        </Row>
      </div>
      )
    }
    return(rows);
  }
  renderBug_data (total, bugID, bugRisk) {
    var rows = [];
    var risk = "";
    if (total > 0) {
      for(var i = 0; i < bugID.length; i++) {
        if (bugID[i] !== "0") {
          if (bugRisk[i] === "1") {
            risk = "critical risk"
          }
          if (bugRisk[i] === "2") {
            risk = "high risk"
          }
          if (bugRisk[i] === "3") {
            risk = "medium risk"
          }
          if (bugRisk[i] === "4") {
            risk = "low risk"
          }
          rows[i] = (
            <Col lg="3" key={i}>
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                  Bug {bugID[i]}
                </label>
                <Input
                  className="form-control-alternative"
                  readOnly
                  value={risk}
                  type="text"
                />
              </FormGroup>
            </Col>
          ); 
        }
      };
    } else {
      rows = (<div />)
    }
    return(rows);
  }
  renderBugReview_data (total, bugID, bugRisk, closed) {
    var rows = [];
    var max = bugID.length;
    if (total > 0 && closed !== true) {
      for(var i = 0; i < bugID.length; i++) {
        if (bugID[i] !== "0") {
          //If coinbase is owner of audit
          if (this.props.coinbase === this.props.data_audit[0]) {
            if (this.props.data_report[5] === "1") {
              if (this.state.reportreceived === true) {
                let input = i;
                rows[i] = (
                  <Col lg="2" key={i}>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                      Response bug {bugID[i]}
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder={bugRisk[i]}
                        type="text"
                        onChange={(e) => this.handleChangeReview(e, input)}
                      />
                    </FormGroup>
                  </Col>
                ); 
              } else {
                let input = i;
                rows[i] = (
                  <Col lg="2" key={i}>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Response bug {bugID[i]}
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder={0}
                        type="text"
                        onChange={(e) => this.handleChangeReview(e, input)}
                      />
                    </FormGroup>
                  </Col>
                );
              }
              rows[max] = (
                <Col lg="2" key={max}>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Additional payment
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder={0}
                        type="text"
                        onChange={(e) => this.handleChangeAddition(e)}
                      />
                    </FormGroup>
                </Col>
              )
              rows[max + 1] = (
                <Col lg="12" key={max + 1}>
                  <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                    <input
                      className="custom-control-input"
                      defaultChecked
                      id="customCheck6"
                      type="checkbox"
                    />
                    <label 
                      className="custom-control-label" 
                      htmlFor="customCheck6"
                      onClick={this.handleChangeReceived}
                    >
                      Report received
                    </label>
                  </div>  
                </Col>
              )
            }  
          }  
        }
      } 
    } else {
      rows = (<div />)
    }
    return(rows);
  }
  renderBugResponse_data (total, bugID, bugReview, payout, closed) {
    var rows = [];
    var max = bugID.length;
    if (total > 0 && closed !== true) {
      for(var i = 0; i < bugID.length; i++) {
        let risk;
        if (bugID[i] !== "0") {
          if (bugReview[i] === "1") {
            risk = "critical risk"
          }
          if (bugReview[i] === "2") {
            risk = "high risk"
          }
          if (bugReview[i] === "3") {
            risk = "medium risk"
          }
          if (bugReview[i] === "4") {
            risk = "low risk"
          }
          if (this.props.data_report[5] === "2") {
            rows[i] = (
              <Col lg="3" key={i}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Response bug {bugID[i]}
                  </label>
                  <Input
                    className="form-control-alternative"
                    readOnly
                    value={risk}
                    type="text"
                  />
                </FormGroup>
              </Col>
            );   
          }
        }
      } 
      rows[max] = (
        <Col lg="8" key={i}>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="input-username"
            >
              Payout
            </label>
            <Input
              className="form-control-alternative"
              readOnly
              value={payout / 10**18 + " ETH"}
              type="text"
            />
          </FormGroup>
        </Col>
      )
    } else {
      rows = (<div />)
    }
    return(rows);
  }
  render() {
    let id = "";
    let bytes = "";
    let owner = "";
    let link = "";
    let balance = 0;
    let reports = "";
    let closed = "";
    let reliability = "";
    let coinbase = "";
    let reward_critical = 0;
    let reward_high = 0;
    let reward_medium = 0;
    let reward_low = 0;
    let report = "";
    let bugID = "";
    let bugRisk = "";
    let bugReview = "";
    let reliability_auditor = "";
    if (this.props.data_audit !== undefined && 
        this.props.bytes !== undefined &&
        this.props.id !== undefined &&
        this.props.reliability !== undefined &&
        this.props.coinbase !== undefined &&
        this.props.data_audit_rewards !== undefined &&
        this.props.data_report !== undefined) {
      id = this.props.id;
      bytes = this.props.bytes;
      owner = this.props.data_audit[0];
      link = this.props.data_audit[1];
      balance = this.props.data_audit[2];
      reports = this.props.data_audit[3];
      closed = this.props.data_audit[4];
      reliability = this.props.reliability;
      coinbase = this.props.coinbase;
      reward_critical = this.props.data_audit_rewards[0];
      reward_high = this.props.data_audit_rewards[1];
      reward_medium = this.props.data_audit_rewards[2];
      reward_low = this.props.data_audit_rewards[3];
      report = this.props.data_report;
      bugID = this.props.bug_ID;
      bugRisk = this.props.bug_Risk;
      bugReview = this.props.bug_Review;
      reliability_auditor = this.props.reliability_auditor;
    }
    var data = "";
    if (bytes.length > 15) {
      data = new Identicon(bytes.toString(), 200).toString();
    } else {
      data = new Identicon("aaaaaaaaaaaaaaa", 200).toString();
    }
    let button;
    if (!closed) {
      button = (<Button
                  className="float-right"
                  color="success"
                  href="#pablo"
                  onClick={() => this.props.depositAudit(bytes, this.state.addDeposit)}
                  size="sm"
                >
                  Deposit ETH
                </Button>
                )
    } else {
      button = <div />;
    }
    return (
      <>
        <UserHeader 
          owner={owner} 
          coinbase={coinbase} 
          bytes={bytes}
          closed={closed}
          closeAudit={this.props.closeAudit} 
        />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>  
                        <img 
                          alt="..."
                          className="rounded-circle"
                          src={"data:image/png;base64," + data}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">{reports}</span>
                          <span className="description">Reports</span>
                        </div>
                        <div>
                          <span className="heading">{reliability}</span>
                          <span className="description">Reliability</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      Audit index {""}
                      <span className="font-weight-light">{id}</span>
                    </h3>
                    <hr className="my-4" />
                    <p>
                      Link: <a href="#pablo" onClick={e => e.preventDefault()}>{link}</a>
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Audit Information</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Audit details
                      {button}
                    </h6>
                    <div className="pl-lg-4">
                      <Row> 
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Identifier
                            </label>
                            <Input
                              className="form-control-alternative"
                              readOnly
                              value={bytes}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Owner
                            </label>
                            <Input
                              className="form-control-alternative"
                              readOnly
                              value={owner}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row> 
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                             Amount available audit
                            </label>
                            <Input
                              className="form-control-alternative"
                              readOnly
                              value={balance / 10**18 + " ETH"}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                             Deposit additional amount
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder={this.state.addDeposit/10**18 + " ETH"}
                              type="text"
                              onChange={this.handleChangeDeposit}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                             Reward critical
                            </label>   
                            <Input
                              className="form-control-alternative"
                              readOnly
                              value={reward_critical / 10**18 + " ETH"}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                             Reward high
                            </label>   
                            <Input
                              className="form-control-alternative"
                              readOnly
                              value={reward_high / 10**18 + " ETH"}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                             Reward medium
                            </label>   
                            <Input
                              className="form-control-alternative"
                              readOnly
                              value={reward_medium / 10**18 + " ETH"}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                             Reward low
                            </label>   
                            <Input
                              className="form-control-alternative"
                              readOnly
                              value={reward_low / 10**18 + " ETH"}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Closed
                            </label>
                            <Input
                              className="form-control-alternative"
                              readOnly
                              value={closed}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Report details
                      {this.renderReport_buttons()}    
                    </h6>               
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Select report
                            </label>
                            <Input
                              className="form-control-alternative"
                              type="select"
                              onChange={this.handleChange}
                              value={this.props.report_index}
                            >
                              {this.renderReports(reports)}
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    {this.renderReport_data(reports, report, reliability_auditor)}
                  
                  <div className="pl-lg-4">
                    <Row>
                      {this.renderBug_data(reports, bugID, bugRisk)}
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <Row>
                      {this.renderBugReview_data(reports, bugID, bugRisk, report[5])}
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <Row>
                      {this.renderBugResponse_data(reports, bugID, bugReview, report[6], report[5])}
                    </Row>
                  </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
