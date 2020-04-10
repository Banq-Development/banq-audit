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
import Web3 from "web3";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import routes from "routes.js";
import Register from "../views/examples/Register.js";

let web3 = "";
class Auth extends React.Component {
  constructor(props) {    
    super(props);
    this.requestAudit = this.requestAudit.bind(this);
    this.getAuditID = this.getAuditID.bind(this);
    this.state = {
      networkID: 0,
      unlocked: "",
      web3Available: false,
      instanceBanqAudit: "",
      instanceConvertBytes: "",
      start: 0,
      total_audits: 0,
      auditDescription: "Paste total description audit request here",
      auditID: "",
    }
  }
  componentDidMount() {
    document.body.classList.add("bg-default");
    this.startWeb3();
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
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
    const instanceBanqAudit = require("../components/web3/BanqAudit.json");
    const addressBanqAudit = "0x0571727FBA960DaaEEb1bC15db12839Fe8251ed2";
    const instanceConvertBytes = require("../components/web3/ConvertBytes.json");
    const addressConvertBytes = "0x915c29f77161F08990AD812cDcf15E993aBC6C00";
    
    if (web3 !== '') {
      await this.setState({instanceBanqAudit: await new web3.eth.Contract(instanceBanqAudit.abi,
      addressBanqAudit)});
      await this.setState({instanceConvertBytes: await new web3.eth.Contract(instanceConvertBytes.abi,
        addressConvertBytes)});
      if (this.state.instanceBanqAudit !== '') {
        //Web3 calls for total values on loading
        let total_audits = await this.state.instanceBanqAudit.methods.indexTotal().call();
        this.setState({total_audits: total_audits});
      }
    }    
  }
  async requestAudit (bytes, link, critical, high, medium, low, reward, agree) {
    if (this.state.instanceBanqAudit !== '') {
      //Web3 send request audit on chain
      let coinbase = await web3.eth.getCoinbase();
      let payment = ((reward * 1) + (reward / 1000 *3)).toString();
      if (agree === true) {
        await this.state.instanceBanqAudit.methods.RequestAudit(bytes,
                                                                link,
                                                                [critical, high, medium, low]
                                                              ).send(
                                                                { from: coinbase,
                                                                  value: payment});
      } 
    }  
  }
  async getAuditID (data) {
    let id;
    if (this.state.instanceConvertBytes !== '') {
      id = await this.state.instanceConvertBytes.methods.stringToBytes32(data).call();
    }
    this.setState({
      auditID: id,
      auditDescription: data,
    });
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") { 
        if (prop.path === "/request") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={() => <Register 
                                requestAudit={this.requestAudit}
                                getAuditID={this.getAuditID}
                                auditID={this.state.auditID}
                                auditDescription={this.state.auditDescription}
                              />}
              key={key}
            />
          );
        } 
        else {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          )
        }
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <div className="main-content">
          <AuthNavbar />
          <div className="header bg-gradient-info py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">Welcome!</h1>
                    <p className="text-lead text-light">
                      The decentralized marketplace for audits.
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
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

export default Auth;
