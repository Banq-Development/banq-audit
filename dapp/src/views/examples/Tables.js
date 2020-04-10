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
import Identicon from "identicon.js";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

class Tables extends React.Component {
  handleClick = e => {
    this.props.getAudit(e.target.value);
  }
  renderTableData (length) {
    var rows = [];
    var start = 0;
    var data = "";
    for(var i = start; i < length; i++) {
      if (this.props.data_audits[i] !== undefined) {  
        if (this.props.audit_id_array[i].length > 15) {
          data = new Identicon(this.props.audit_id_array[i].toString(), 200).toString();
        } else {
          data = new Identicon("aaaaaaaaaaaaaaa", 200).toString();
        }
        rows[i] = (   
            <tr key={i}>
              <th scope="row">
                <Media className="align-items-center">
                  <a
                    className="avatar rounded-circle mr-3"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >    
                  <img
                    alt="..."
                    src={"data:image/png;base64," + data}
                  />
                  </a>
                  <Media>
                    <span className="mb-0 text-sm">
                    {this.props.pending_total_array[i]}
                    </span>
                  </Media>
                </Media>
                  </th>
                    <td>{this.props.data_audits[i][2] / 10**18} ETH</td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success" />  
                      </Badge>
                      pending
                    </td>
                    <td>
                      {this.props.data_audits[i][0]}
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2 text-primary">{this.props.reliability_audits[i] + " points"}</span>
                      </div>
                    </td>
                    <td>
                      {this.props.data_audits[i][1]}
                    </td>
                  <td className="text-right">
                <UncontrolledDropdown>
                  <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem
                        tag={Link} 
                        to={'/auth/report/'+ this.props.pending_total_array[i] + '/' + this.props.audit_id_array[i]}
                      >
                        Submit report
                      </DropdownItem>
                      <DropdownItem
                        value={this.props.audit_id_array[i]}
                        onClick={e => this.handleClick(e)}
                      >
                        View details
                      </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
      )}
    };
    return(rows);
  }
  paging () {
    let audits_perpage = 10;
    let totalPages = Math.ceil(this.props.total_audits / audits_perpage);
    let start_value = Math.ceil(this.props.start / audits_perpage + 1);
    let start_input = this.props.start
    let previous = Math.round(start_input - audits_perpage);
    let next = Math.round(start_input + audits_perpage);
    //Get active number and set active page 
    let number_active = start_value;
    let active_first = "";
    let active_middle = "";
    let active_last = "";
    //Calculate start value of paging to show pages available
    if (totalPages <= audits_perpage){
      start_value = 1;
      start_input = 0;
      if (this.props.start === 0) {
        previous = 0;
      };
      if (next >= totalPages * audits_perpage) {
        next = totalPages * audits_perpage - audits_perpage;
      };
    };
    if (totalPages > audits_perpage){
      if (start_value === totalPages - 1){
        start_value = Math.round(totalPages - 2);
        start_input = Math.round(start_value * audits_perpage - audits_perpage);
      };
      if (start_value === totalPages){
        start_value = Math.round(totalPages - 2);
        start_input = Math.round(start_value * audits_perpage - audits_perpage);
      };
      if (next >= totalPages * audits_perpage) {
        next = totalPages * audits_perpage - audits_perpage;
      };
    };
    if (this.props.start === 0) {
      previous = 0;
    };
    if (number_active === start_value) {
      active_first = "active"
    }
    if (number_active === start_value + 1) {
      active_middle = "active"
    }
    if (number_active === start_value + 2) {
      active_last = "active"
    }
    var rows = (
        <nav aria-label="..." key={0}>
          <Pagination
            className="pagination justify-content-end mb-0"
            listClassName="justify-content-end mb-0"
          >
            <PaginationItem>
              <PaginationLink
                href="#pablo"
                onClick={() => this.props.restartWeb3Data(previous)}
              >
                <i className="fas fa-angle-left" />
                <span className="sr-only">Previous</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className={active_first}>
              <PaginationLink
                href="#pablo"
                onClick={() => this.props.restartWeb3Data(start_input)}
              >
                {start_value}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className={active_middle}>
              <PaginationLink
                href="#pablo"
                onClick={() => this.props.restartWeb3Data(start_input + audits_perpage)} 
              >
                {start_value + 1} <span className="sr-only">(current)</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className={active_last}>
              <PaginationLink
                href="#pablo"
                onClick={() => this.props.restartWeb3Data(start_input + audits_perpage * 2)}
              >
                {start_value + 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#pablo"
                onClick={() => this.props.restartWeb3Data(next)}
              >
                <i className="fas fa-angle-right" />
                <span className="sr-only">Next</span>
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </nav>
    ) 
    return(rows); 
  }
  render() {
    let number = this.props.pending_total_array.length;
    return (
      <>
        <Header 
            total_audits={this.props.total_audits}
            pending_audits={this.props.pending_audits}
            total_reward_available={this.props.total_reward_available}
            total_reports={this.props.total_reports}
        />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">            
                      <h3 className="mb-0">Pending audits</h3>
                    </div>
                    <div className="col text-right">
                      <Link to="/auth/request">
                        <Button  
                          color="primary" 
                          type="button" 
                          size="sm" 
                        >
                          Request audit
                        </Button>
                      </Link>
                    </div>
                  </Row>
                </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Audit ID</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Status</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Reliability owner</th>
                        <th scope="col">Link details</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderTableData(number)}
                    </tbody>
                  </Table>
                <CardFooter className="py-4">
                  {this.paging()}
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
