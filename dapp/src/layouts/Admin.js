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
import Web3 from "web3";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
//Page import
import Tables from "../views/examples/Tables.js";
import Profile from "../views/examples/Profile.js";

let web3 = "";
const instanceBanqAudit = require("../components/web3/BanqAudit.json");
const addressBanqAudit = "0x777DEFE54A17C2A2534E05961e38556F93C56A35";
class Admin extends React.Component {
  constructor(props) {    
    super(props);
    this.restartWeb3Data = this.restartWeb3Data.bind(this);
    this.getAudit = this.getAudit.bind(this);
    this.depositAudit = this.depositAudit.bind(this);
    this.closeAudit = this.closeAudit.bind(this);
    this.getReport = this.getReport.bind(this);
    this.closeReport = this.closeReport.bind(this);
    this.respondReportAuditee = this.respondReportAuditee.bind(this);
    this.respondReportAuditor = this.respondReportAuditor.bind(this);
    this.state = {
      networkID: 0,
      unlocked: "",
      web3Available: false,
      instanceBanqAudit: "",
      start: 0,
      total_audits: 0,
      pending_audits: 0,
      total_reward_available: 0,
      total_reports: 0,
      pending_total: [],
      audit_id: [],
      data_audits: [],
      reliability_audits: [],
      data_audit_rewards: [],
      data_audit_reports: [],
      data_audit: "", 
      data_report: "",
      bytes: "", 
      id: "",
      reliability: "",
      coinbase: "",
      report_index: 0,
      index_report: "",
      bug_ID: [],
      bug_Risk: [],
      bug_Review: [],
      reliability_auditor: "",
    }
  }
  componentDidMount() {
    this.startWeb3(0);
  }
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  async restartWeb3Data (start) {
    this.setState({ 
      pending_total: [],
      audit_id: [],
      data_audits: [],
    });
    this.startWeb3(start);
  }
  async startWeb3 (start) {
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
    this.getWeb3Data(start);
  }
  async getWeb3Data (start) {  
    if (web3 !== '') {
      await this.setState({instanceBanqAudit: await new web3.eth.Contract(instanceBanqAudit.abi,
      addressBanqAudit)});
      await this.setState({start: start});
      if (this.state.instanceBanqAudit !== '') {
        //Web3 calls for total values on loading
        let total_audits = await this.state.instanceBanqAudit.methods.indexTotal().call();
        this.setState({total_audits: total_audits});
        let pending_audits = await this.state.instanceBanqAudit.methods.indexPending().call();
        this.setState({pending_audits: pending_audits});
        let total_reward_available = await this.state.instanceBanqAudit.methods.totalRewardAvailable().call();
        this.setState({total_reward_available: total_reward_available});
        let total_reports = await this.state.instanceBanqAudit.methods.indexReports().call();
        this.setState({total_reports: total_reports});
        //Call audit data and send as prop to child 
        let audits_perpage = 10;
        let number = 0;
        if (pending_audits - start >= audits_perpage) {
          number = audits_perpage;
        }
        if (pending_audits - start < audits_perpage) {
          number =  pending_audits - start;
        }
        for(var i = start; i < (start + number); i++) {
            let pending_total = await this.state.instanceBanqAudit.methods.pending_total(i).call();
            this.setState({ 
              pending_total: this.state.pending_total.concat([pending_total])
            })
            let audit_id = await this.state.instanceBanqAudit.methods.index_audit(pending_total).call();
            this.setState({ 
              audit_id: this.state.audit_id.concat([audit_id])
            })
            let data_audits = await this.state.instanceBanqAudit.methods.audits(audit_id).call();
            this.setState({ 
              data_audits: this.state.data_audits.concat([data_audits])
            })
            let reliability_audits = await this.state.instanceBanqAudit.methods.reliability_auditee(data_audits[0]).call();
            this.setState({ 
              reliability_audits: this.state.reliability_audits.concat([reliability_audits])
            })
        }
      }
    }    
  }
  async getAudit (bytes) {
    this.props.history.push('/admin/details')
    if (this.state.instanceBanqAudit !== '') {
      let coinbase = await web3.eth.getCoinbase();
      try {
        let data_audit = await this.state.instanceBanqAudit.methods.audits(bytes).call();
        let data_audit_rewards = await this.state.instanceBanqAudit.methods.getAuditData(bytes).call();
        let data_audit_reports = await this.state.instanceBanqAudit.methods.getAuditReports(bytes).call();
        let id = await this.state.instanceBanqAudit.methods.audit_index(bytes).call();
        let reliability = await this.state.instanceBanqAudit.methods.reliability_auditee(data_audit[0]).call();
        this.setState({ 
          data_audit: data_audit,
          data_audit_rewards: data_audit_rewards,
          data_audit_reports: data_audit_reports,
          bytes: bytes,
          id: id,
          reliability: reliability,
          coinbase: web3.utils.toChecksumAddress(coinbase),
        }); 
      } catch (exception) {
        console.log(exception);
      }
      if (this.state.data_audit[3] > 0) {
        this.getReport(0);
      }
    }
  }
  async getReport (index_audit) {
    if (this.state.instanceBanqAudit !== '') {
      try {
        let index_report = this.state.data_audit_reports[index_audit];
        let data_report = await this.state.instanceBanqAudit.methods.reports(index_report).call();
        let bug_ID = await this.state.instanceBanqAudit.methods.getReportData(index_report, 0).call();
        let bug_Risk = await this.state.instanceBanqAudit.methods.getReportData(index_report, 1).call();
        let bug_Review = await this.state.instanceBanqAudit.methods.getReportData(index_report, 2).call();
        let reliability = await this.state.instanceBanqAudit.methods.reliability_auditor(data_report[0]).call();
        this.setState({ 
          report_index: index_audit,
          index_report: index_report,
          data_report: data_report,
          bug_ID: bug_ID,
          bug_Risk: bug_Risk,
          bug_Review: bug_Review,
          reliability_auditor: reliability,
        }); 
      } catch (exception) {
        console.log(exception);
      }
    }
  }
  async depositAudit (bytes, amount) {
    if (this.state.instanceBanqAudit !== '') { 
      let sender = this.state.coinbase; 
      let amount_addfee = ((amount * 1) + (amount / 1000 * 3)).toString();
      await this.state.instanceBanqAudit.methods.depositAudit(bytes).send({from: sender, value: amount_addfee});
    }
  }
  async respondReportAuditee (review, addition, accept) {
    if (this.state.instanceBanqAudit !== '') { 
      let sender = this.state.coinbase; 
      await this.state.instanceBanqAudit.methods.VerifyReport(this.state.index_report,
                                                              review,
                                                              addition.toString(),
                                                              accept).send({from: sender});
    }
  }
  async respondReportAuditor (response) {
    if (this.state.instanceBanqAudit !== '') { 
      let sender = this.state.coinbase; 
      await this.state.instanceBanqAudit.methods.ClaimResponse(this.state.index_report,
                                                              response).send({from: sender});
    }
  }
  async closeAudit (bytes) {
    if (this.state.instanceBanqAudit !== '') { 
      let sender = this.state.coinbase;
      await this.state.instanceBanqAudit.methods.CloseAuditRequest(bytes).send({from: sender});
    }
  }
  async closeReport () {
    if (this.state.instanceBanqAudit !== '') {
      let sender = this.state.coinbase;
      await this.state.instanceBanqAudit.methods.CloseReport(this.state.index_report).send({from: sender});
    }
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        if (prop.path === "/details") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={() => <Profile 
                                web3Available={this.state.web3Available}
                                data_audit={this.state.data_audit}
                                data_audit_rewards={this.state.data_audit_rewards}
                                data_audit_reports={this.state.data_audit_reports}
                                data_report={this.state.data_report}
                                bytes={this.state.bytes}
                                id={this.state.id}
                                reliability={this.state.reliability}
                                coinbase={this.state.coinbase}
                                getReport={this.getReport}
                                report_index={this.state.report_index}
                                index_report={this.state.index_report}
                                closeReport={this.closeReport}
                                closeAudit={this.closeAudit}
                                bug_ID={this.state.bug_ID}
                                bug_Risk={this.state.bug_Risk}
                                bug_Review={this.state.bug_Review}
                                depositAudit={this.depositAudit}
                                reliability_auditor={this.state.reliability_auditor}
                                respondReportAuditee={this.respondReportAuditee}
                                respondReportAuditor={this.respondReportAuditor}
                              />}
              key={key}
            />
          );
        } else {
          return (
            <Route
            path={prop.layout + prop.path}
            component={() => <Tables 
                                web3={web3}
                                web3Available={this.state.web3Available}
                                instance={this.state.instanceBanqAudit}
                                start={this.state.start}
                                total_audits={this.state.total_audits}
                                pending_audits={this.state.pending_audits}
                                total_reward_available={this.state.total_reward_available}
                                total_reports={this.state.total_reports}
                                pending_total_array={this.state.pending_total}
                                audit_id_array={this.state.audit_id}
                                data_audits={this.state.data_audits}
                                reliability_audits={this.state.reliability_audits}
                                restartWeb3Data={this.restartWeb3Data}
                                routes={routes}
                                getAudit={this.getAudit}
                                
                             />}
            key={key}
            />
          );
        }  
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {  
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            text: "BANQ • Audit",
            imgSrc: "",
            imgAlt: "..."
          }}
        >
        </Sidebar>
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
            getAudit={this.getAudit}
          />
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
