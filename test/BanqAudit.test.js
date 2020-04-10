const BanqAudit = artifacts.require("BanqAudit")

const truffleAssert = require('truffle-assertions')
const BN = require('bn.js')

//Console log the addresses of the deployed contracts
contract('BanqAudit', async accounts => {
	var instance;
	before(async() => {
		instance = await BanqAudit.deployed()
	});
	/*
	 * @dev 	the function opens an audit, where reports can 
	 *			be submitted.
	 *
	 * @tests	good flow:	
	 * 			1. add msg.value to totalRewardsAvailable
	 * 			2. add audit data to variable 'audits'
	 * 			3. add index audits total
	 * 			4. add index audits pending
	 * 			5. add balance minus fee and pay dev
	 * 
	 * 			bad flow:	
	 * 			1. revert if ID is double
	 * 		
	 */
	describe('RequestAudit()', function () {
		it("should open a audit request", async () => {
			let bytes = "0x7465737400000000000000000000000000000000000000000000000000000000"
			let link = "test.com"
			let rewards = ["8000000000000000000",
						   "4000000000000000000",
						   "2000000000000000000",
						   "1000000000000000000"]
			//0.3% fee is 0.09 ETH
			let amount = "30090000000000000000"
			let amount_nofee = "30000000000000000000"
			await instance.RequestAudit(bytes, link, rewards, {value: amount})
			//test 1 - add to total 
			let totalrewards = await instance.totalRewardAvailable.call()
			assert.equal(totalrewards.toString(), amount_nofee, "RequestAudit(): totalreward not updated")
			//test 2 - add audit data
			let audit = await instance.audits.call(bytes)
			assert.equal(audit[0].toString(), accounts[0], "RequestAudit(): audit data false owner")
			assert.equal(audit[1].toString(), link, "RequestAudit(): audit data false link")
			assert.equal(audit[2].toString(), amount_nofee, "RequestAudit(): audit data false balance")
			assert.equal(audit[3].toString(), "0", "RequestAudit(): audit data false report index")
			assert.equal(audit[4].toString(), "false", "RequestAudit(): audit data false closed")
			//test 3 - add index total
			let indextotal = await instance.indexTotal.call()
			assert.equal(indextotal.toString(), "1", "RequestAudit(): index total not updated")
			//test 4 - add index pending
			let indexpending = await instance.indexPending.call()
			assert.equal(indexpending.toString(), "1", "RequestAudit(): index pending not updated")
		});
		it("should not open a double ID audit", async () => {
			//test 1 - revert if double id
			let bytes = "0x7465737400000000000000000000000000000000000000000000000000000000"
			let link = "test.com"
			let rewards = ["8000000000000000000",
						   "4000000000000000000",
						   "2000000000000000000",
						   "1000000000000000000"]
			let amount = "30090000000000000000"
			truffleAssert.reverts(instance.RequestAudit(bytes, link, rewards, {value: amount}))
		});
		it("should add balance minus fee and add fee to dev", async () => {
			//test 4 - revert if double id
			let bytes = "0x7465737500000000000000000000000000000000000000000000000000000000"
			let link = "test_balance.com"
			let rewards = ["8000000000000000000",
						   "4000000000000000000",
						   "2000000000000000000",
						   "1000000000000000000"]
			let amount = "30090000000000000000"
			let amount_nofee = "30000000000000000000"
			let amount_fee = "90000000000000000"
			//Get dev balance
			let dev = await instance.dev.call()
			let balance_before = new BN(await web3.eth.getBalance(dev))
			await instance.RequestAudit(bytes, link, rewards, {value: amount, from: accounts[3]})
			let balance_after = new BN(await web3.eth.getBalance(dev))
			let balance_diff = balance_after.sub(balance_before)
			assert.equal(balance_diff.toString(), amount_fee, "RequestAudit(): dev did not receive fee")
			let audit = await instance.audits.call(bytes)
			assert.equal(audit[2].toString(), amount_nofee, "RequestAudit(): audit data balance includes fee")
			//Close audit for rest of tests
			await instance.CloseAuditRequest(bytes, {from: accounts[3]})
		});
	});	
	/*
	 * @dev 	the function submits a report to an audit 
	 *
	 * @tests	good flow:	
	 * 			1. add report index to variable 'audits'
	 * 			2. add report data to variable 'reports'
	 * 			3. add index reports total
	 * 
	 * 			bad flow:	
	 * 			1. revert if report sender == auditor
	 * 		
	 */
	describe('SubmitReport()', function () {
		it("should add report to audit", async () => {
			let bytes = "0x7465737400000000000000000000000000000000000000000000000000000000"
			let bytes_report = "0x8465737400000000000000000000000000000000000000000000000000000000"
			let link = "test.report.com"
			let bug_id = ["1", "2", "3", "0", "0", "0", "0", "0", "0", "0"]
			let bug_risk = ["1", "4", "4", "0", "0", "0", "0", "0", "0", "0"]
			await instance.SubmitReport(bytes, bytes_report, link, bug_id, bug_risk, {from: accounts[1]})
			//test 1 - add report to audit
			let audit = await instance.audits.call(bytes)
			assert.equal(audit[3].toString(), "1", "SubmitReport(): audit reportindex not updated")
			let audit_report = await instance.getAuditReports.call(bytes)
			assert.equal(audit_report.toString(), "0", "SubmitReport(): audit report in array not updated")
			//test 1 - add report data to report
			let report = await instance.reports.call(0)
			assert.equal(report[0].toString(), accounts[1], "SubmitReport(): report data false owner")
			assert.equal(report[1].toString(), bytes, "SubmitReport(): report data false audit id")
			assert.equal(report[2].toString(), bytes_report, "SubmitReport(): report data false report id")
			assert.equal(report[3].toString(), link, "SubmitReport(): report data false link")
			assert.equal(report[4].toString(), "9", "SubmitReport(): report data false total risk")
			assert.equal(report[5].toString(), "1", "SubmitReport(): report data false report status")
			assert.equal(report[6].toString(), "0", "SubmitReport(): report data payout not zero")
			//test 3 - add index total
			let indexreport = await instance.indexReports.call()
			assert.equal(indexreport.toString(), "1", "SubmitReport(): index report total not updated")
		});
		it("should revert if auditor is auditee", async () => {
			//test 1 - revert if sender is auditee
			let bytes = "0x7465737400000000000000000000000000000000000000000000000000000000"
			let bytes_report = "0x8465737400000000000000000000000000000000000000000000000000000000"
			let link = "test.report.com"
			let bug_id = ["1", "2", "3", "0", "0", "0", "0", "0", "0", "0"]
			let bug_risk = ["1", "4", "4", "0", "0", "0", "0", "0", "0", "0"]
			truffleAssert.reverts(
				instance.SubmitReport(bytes, bytes_report, link, bug_id, bug_risk, {from: accounts[0]})
				)
		});
	});
	/*
	 * @dev 	the function lets an auditee (owner audit)
	 *			respond to a report
	 *
	 * @tests	good flow - accepted reports:	
	 * 			1. change report status to 2
	 * 			2. add reliability points to auditee and auditor
	 * 			3. sub accepted reward from total reward
	 * 			4. add accepted reward to total pending payout 
	 * 			5. sub reward from balance audit
	 * 			6. add reward to balance payout report
	 * 
	 * 			good flow - rejected reports:
	 * 			1. change report status to 3
	 * 			2. remove reliability points from auditor
	 * 
	 * 			bad flow:	
	 * 			1. revert if not owner of audit
	 * 		
	 */
	describe('VerifyReport()', function () {
		it("should revert if not auditee", async () => {
			//test 1 - revert if not auditee
			let report_id = 0
			let bug_claim = ["1", "4", "4", "0", "0", "0", "0", "0", "0", "0"]
			let addition = "0"
			let accept = true
			truffleAssert.reverts(
				instance.VerifyReport(report_id, bug_claim, addition, accept, {from: accounts[2]})
				)
		});
		it("should accept report", async () => {
			//accepted reports
			let bytes = "0x7465737400000000000000000000000000000000000000000000000000000000"
			let report_id = 0
			let bug_claim = ["1", "4", "4", "0", "0", "0", "0", "0", "0", "0"]
			let addition = "0"
			let accept = true
			await instance.VerifyReport(report_id, bug_claim, addition, accept, {from: accounts[0]})
			//test 1 - change report status to 2
			let report = await instance.reports.call(report_id)
			assert.equal(report[5].toString(), "2", "VerifyReport(): report status not updated")
			//test 2 - add reliability points
			let reliability_auditee = await instance.reliability_auditee.call(accounts[0])
			assert.equal(reliability_auditee.toString(), "1000", "VerifyReport(): reliability auditee not updated")
			let reliability_auditor = await instance.reliability_auditor.call(accounts[1])
			assert.equal(reliability_auditor.toString(), "1000", "VerifyReport(): reliability auditor not updated")
			//test 3 - sub reward from total
			let amount = "20000000000000000000"
			let totalreward = await instance.totalRewardAvailable.call()
			assert.equal(totalreward.toString(), amount, "VerifyReport(): payout not deducted from total reward")
			//test 4 - add reward to payout total
			let amount_payout = "10000000000000000000"
			let totalpayout = await instance.totalPendingPayout.call()
			assert.equal(totalpayout.toString(), amount_payout, "VerifyReport(): payout not add to total payout")
			//test 5 - sub payout from balance audit
			let audit = await instance.audits.call(bytes)
			assert.equal(audit[2].toString(), amount, "VerifyReport(): payout not deducted from audit balance")
			//test 6 - add reward to payout report
			assert.equal(report[6].toString(), amount_payout, "VerifyReport(): payout not added to report payout")
		});
		it("should reject report", async () => {
			//rejected reports
			let bytes = "0x7465737400000000000000000000000000000000000000000000000000000000"
			let bytes_report_2 = "0x8565737400000000000000000000000000000000000000000000000000000000"
			let link_2 = "test.reportA.com"
			let bug_id_2 = ["1", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
			let bug_risk_2 = ["3", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
			await instance.SubmitReport(bytes, bytes_report_2, link_2, bug_id_2, bug_risk_2, {from: accounts[1]})
			let report_id_2 = 1
			let bug_claim_2 = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
			let addition = "0"
			let accept_2 = false
			await instance.VerifyReport(report_id_2, bug_claim_2, addition, accept_2, {from: accounts[0]})
			//test 1 - change report status
			let report_2 = await instance.reports.call(report_id_2)
			assert.equal(report_2[5].toString(), "3", "VerifyReport(): report status not updated")
			//test 2 - reliability auditor deducted
			let reliability_auditor_2 = await instance.reliability_auditor.call(accounts[1])			
			assert.equal(reliability_auditor_2.toString(), "800", "VerifyReport(): reliability auditor not updated")
		});
	});
	/*
	 * @dev 	the function lets an auditor (owner report)
	 *			accept or reject the response of the auditee
	 *
	 * @tests	good flow - accepted response:	
	 * 			1. change report status to 3
	 * 			2. add auditor to validators audit
	 * 			3. pay report payout to auditor
	 * 			4. add balance minus fee to auditor and add fee to dev
	 * 
	 * 			good flow - rejected response:
	 * 			1. change report status to 3
	 * 			2. add auditor to validators audit
	 * 			3. pay audit payout to auditor
	 * 			4. deduct reliability points from auditee
	 * 			5. deduct reliability points from total reliability
	 * 
	 *  		bad flow:	
	 * 			1. revert if not owner of report
	 * 
	 */
	describe('ClaimResponse()', function () {
		it("should revert if not auditee", async () => {
			//test 1 - revert if not owner
			let report_id = 0
			let accept = true
			truffleAssert.reverts(
				instance.ClaimResponse(report_id, accept, {from: accounts[2]})
				)
		});
		it("should claim payment and accept", async () => {
			//accepted reports
			let bytes = "0x7465737400000000000000000000000000000000000000000000000000000000"
			let report_id = 0
			let accept = true
			//Transaction data (balance before and gascost)
			let balance_before = new BN(await web3.eth.getBalance(accounts[1]));
			let transaction = await instance.ClaimResponse(report_id, accept, {from: accounts[1]})
			let transaction_data = await web3.eth.getTransaction(transaction.receipt.transactionHash)
			let txt_cost = transaction.receipt.gasUsed * transaction_data.gasPrice;
			let BNtxt_cost = new BN(txt_cost)
			//test 1 - change report status to 2
			let report = await instance.reports.call(report_id)
			assert.equal(report[5].toString(), "3", "ClaimResponse(): report status not updated")
			//test 2 - add auditor to validators audit
			let audit_validators = await instance.getAuditValidators.call(bytes)
			assert.equal(audit_validators[0].toString(), accounts[1], "ClaimResponse(): auditor not added to validators")
			//test 3 - transfer payout to auditor
			let balance_after = new BN(await web3.eth.getBalance(accounts[1]))
			let balance_diff = balance_after.sub(balance_before)
			// 10 ETH minus fee (0.3%) = 9.97 ETH
			let balance_check = new BN("9970000000000000000").sub(BNtxt_cost)
			assert.equal(balance_diff.toString(), balance_check.toString(), "ClaimResponse(): auditor did not receive payment")
		});
		it("should claim payment and reject", async () => {
			//Create new report and validate
			let bytes = "0x7465737400000000000000000000000000000000000000000000000000000000"
			let bytes_report_3 = "0x8665737400000000000000000000000000000000000000000000000000000000"
			let link_3 = "test.reportC.com"
			let bug_id_3 = ["1", "2", "3", "0", "0", "0", "0", "0", "0", "0"]
			let bug_risk_3 = ["1", "4", "4", "0", "0", "0", "0", "0", "0", "0"]
			await instance.SubmitReport(bytes, bytes_report_3, link_3, bug_id_3, bug_risk_3, {from: accounts[1]})
			let report_id_3 = 2
			let bug_claim_3 = ["1", "4", "4", "0", "0", "0", "0", "0", "0", "0"]
			let addition = "0"
			let accept_3 = true
			await instance.VerifyReport(report_id_3, bug_claim_3, addition, accept_3, {from: accounts[0]})
			//acces audit response
			let accept_response = false
			//Transaction data (balance before and gascost)
			let balance_before = new BN(await web3.eth.getBalance(accounts[1]))
			let transaction = await instance.ClaimResponse(report_id_3, accept_response, {from: accounts[1]})
			let transaction_data = await web3.eth.getTransaction(transaction.receipt.transactionHash);
			let txt_cost = transaction.receipt.gasUsed * transaction_data.gasPrice;
			let BNtxt_cost = new BN(txt_cost)
			//test 1 - change report status to 2
			let report = await instance.reports.call(report_id_3)
			assert.equal(report[5].toString(), "3", "ClaimResponse(): report status not updated")
			//test 2 - add auditor to validators audit
			let audit_validators = await instance.getAuditValidators.call(bytes)
			assert.equal(audit_validators[0].toString(), accounts[1], "ClaimResponse(): auditor not added to validators")
			//test 3 - transfer payout to auditor
			let balance_after = new BN(await web3.eth.getBalance(accounts[1]))
			let balance_diff = balance_after.sub(balance_before)
			// 10 ETH minus fee (0.3%) = 9.97 ETH
			let balance_check = new BN("9970000000000000000").sub(BNtxt_cost)
			assert.equal(balance_diff.toString(), balance_check.toString(), "ClaimResponse(): auditor did not receive payment")
			//test 4 - deduct reliability points
			let reliability_auditee = await instance.reliability_auditee.call(accounts[0])
			assert.equal(reliability_auditee.toString(), "1000", "ClaimResponse(): auditee reliability not deducted")
			//test 5 - total reliability auditee
			let total_reliability_auditee = await instance.totalReliability_auditee.call()
			assert.equal(total_reliability_auditee.toString(), "1000", "ClaimResponse(): auditee reliability not deducted total")
		});




		it("should add balance minus fee to auditor and add fee to dev", async () => {
			//First add new audit and new report to audit
			let bytes = "0x7565738500000000000000000000000000000000000000000000000000000000"
			let link = "test_balance_fee_deduct.com"
			let rewards = ["8000000000000000000",
						   "4000000000000000000",
						   "2000000000000000000",
						   "1000000000000000000"]
			let amount = "30090000000000000000"
			let amount_fee = "90000000000000000"
			await instance.RequestAudit(bytes, link, rewards, {value: amount, from: accounts[3]})
			let bytes_report = "0x8565738500000000000000000000000000000000000000000000000000000000"
			let link_report = "test.report_fee_deduct.com"
			let bug_id = ["1", "2", "3", "0", "0", "0", "0", "0", "0", "0"]
			let bug_risk = ["1", "4", "4", "0", "0", "0", "0", "0", "0", "0"]
			await instance.SubmitReport(bytes, bytes_report, link_report, bug_id, bug_risk, {from: accounts[4]})
			let audit_data = await instance.getAuditReports.call(bytes)
			let reportID =	audit_data[0]
			//Claim reward and check balance change dev and auditor
			await instance.VerifyReport(reportID, bug_risk, "0", true, {from: accounts[3]})
			let dev = await instance.dev.call()
			let payment = await instance.reports.call(reportID)
			let balance_dev_before = new BN(await web3.eth.getBalance(dev))
			let balance_auditor_before = new BN(await web3.eth.getBalance(accounts[4]))
			let transaction = await instance.ClaimResponse(reportID, true, {from: accounts[4]})
			let transaction_data = await web3.eth.getTransaction(transaction.receipt.transactionHash)
			let txt_cost = new BN((transaction.receipt.gasUsed * transaction_data.gasPrice).toString());
			let balance_dev_after= new BN(await web3.eth.getBalance(dev))
			let balance_auditor_after = new BN(await web3.eth.getBalance(accounts[4]))
			let balance_dev_diff = balance_dev_after.sub(balance_dev_before)
			let balance_auditor_diff = balance_auditor_after.sub(balance_auditor_before).add(txt_cost)
			let check = payment[6].sub(balance_dev_diff)
			let amount_fee_auditor = "30000000000000000"
			assert.equal(balance_dev_diff.toString(), amount_fee_auditor, "ClaimResponse(): fee dev not transferred")
			assert.equal(balance_auditor_diff.toString(), check.toString(), "ClaimResponse(): auditor did not receivee payout minus feeee")
			//Close audit for rest of the tests
			await instance.CloseAuditRequest(bytes, {from: accounts[3]})
		});



	});
	/*
	 * @dev 	the function lets anyone deposit funds 
	 *			in an audit
	 *
	 * @tests	good flow:	
	 * 			1. add msg.value to variable 'totalRewardAvailable'
	 *			2. add msg.value to balance of audit
	 *			3. add balance minus fee and add fee to dev
	 * 		
	 */
	describe('depositAudit()', function () {
		it("should add deposit to audit", async () => {
			let bytes = "0x7465737400000000000000000000000000000000000000000000000000000000"
			//add fee of 0.03%
			let amount = "10030000000000000000"
			await instance.depositAudit(bytes, {from: accounts[2], value: amount})
			//test 1 - add msg.value to total
			let total = await instance.totalRewardAvailable.call()
			assert.equal(total.toString(), "20000000000000000000", "depositAudit(): total reward available not updated")
			//test 2 - add msg.value to balance audit
			let audit = await instance.audits.call(bytes)
			let balance = audit[2]
			assert.equal(balance.toString(), "20000000000000000000", "depositAudit(): balance audit not updated")
		});
		it("should add balance minus fee and add fee to dev", async () => {
			//test 3 - add balance minus fee and add fee to dev
			let bytes = "0x7465737700000000000000000000000000000000000000000000000000000000"
			let link = "test_balance2.com"
			let rewards = ["8000000000000000000",
						   "4000000000000000000",
						   "2000000000000000000",
						   "1000000000000000000"]
			let amount = "30090000000000000000"
			let amount_deposit_nofee = "10030000000000000000"
			let amount_deposit_fee = "30000000000000000"
			let total = "40000000000000000000"
			//Open audit
			await instance.RequestAudit(bytes, link, rewards, {value: amount, from: accounts[3]})
			//Get dev balance before
			let dev = await instance.dev.call()
			let balance_before = new BN(await web3.eth.getBalance(dev))
			await instance.depositAudit(bytes, {from: accounts[3], value: amount_deposit_nofee})
			let balance_after = new BN(await web3.eth.getBalance(dev))
			let balance_diff = balance_after.sub(balance_before)
			assert.equal(balance_diff.toString(), amount_deposit_fee, "depositAudit(): dev did not receive fee")
			let audit = await instance.audits.call(bytes)
			assert.equal(audit[2].toString(), total, "depositAudit(): audit data balance includes fee")
			//Close audit for rest of tests
			await instance.CloseAuditRequest(bytes, {from: accounts[3]})
		});
	});
	/*
	 * @dev 	the function lets the owner of the report 
	 *			close a report before response from auditee
	 *
	 * @tests	good flow:
	 * 			1. change report status to 3 (closed) by owner report
	 * 
	 *   		bad flow:	
	 * 			1. revert if not owner of report
	 * 		
	 */	
	describe('CloseReport()', function () {
		it("should revert if not auditor", async () => {
			//test 1 - revert if not owner report
			let bytes = "0x7465737400000000000000000000000000000000000000000000000000000000"
			let bytes_report_4 = "0x8765737400000000000000000000000000000000000000000000000000000000"
			let link_4 = "test.reportD.com"
			let bug_id_4 = ["1", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
			let bug_risk_4 = ["4", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
			await instance.SubmitReport(bytes, bytes_report_4, link_4, bug_id_4, bug_risk_4, {from: accounts[1]})
			truffleAssert.reverts(
				instance.CloseReport(3, {from: accounts[2]})
			)
		});
		it("should close the report", async () => {
			//test 1 - change report status to 3
			await instance.CloseReport(4, {from: accounts[1]})
			let report_4 = await instance.reports.call(4)
			let status = report_4[5]
			assert.equal(status, "3", "CloseReport(): status of report not closed")
		});
	});
	/*
	 * @dev 	the function lets the owner of the audit
	 *			close a audit. Open reports can still be 
	 *			finished.
	 *
	 * @tests	good flow:
	 * 			1. change audit status to closed true by owner audit
	 * 			2. sub balance audit from variable 'totalRewardAvailable'
	 * 			3. set balance audit to zero
	 * 			4. remove index audit from map pending audits
	 * 			5. transfer balance audit to owner audit
	 * 
	 * 			bad flow:	
	 * 			1. revert if not owner of audit
	 * 
	 */	
	describe('CloseAuditRequest()', function () {
		it("should revert if not owner audit", async () => {
			//test 1 - revert if not owner report
			let bytes = "0x7465737400000000000000000000000000000000000000000000000000000000"
			truffleAssert.reverts(
				instance.CloseAuditRequest(bytes, {from: accounts[2]})
			)
		});
		it("should revert if there is an open report", async () => {
			//test 1 - revert if not owner report
			let bytes = "0x7465737400000000000000000000000000000000000000000000000000000000"
			let bytes_report = "0x8965737400000000000000000000000000000000000000000000000000000000"
			let link = "test.report.com"
			let bug_id = ["1", "2", "3", "0", "0", "0", "0", "0", "0", "0"]
			let bug_risk = ["1", "4", "4", "0", "0", "0", "0", "0", "0", "0"]
			await instance.SubmitReport(bytes, bytes_report, link, bug_id, bug_risk, {from: accounts[1]})
			truffleAssert.reverts(
				instance.CloseAuditRequest(bytes, {from: accounts[2]})
			)
			//Close report for next test
			let reportID = await instance.getAuditReports.call(bytes);
			await instance.VerifyReport(reportID[4], bug_risk, "0", false);
		});
		it("should close audit and pay remaining reward", async () => {
			let bytes = "0x7465737400000000000000000000000000000000000000000000000000000000"
			let total_before = await instance.totalRewardAvailable.call()
			let audit_before = await instance.audits.call(bytes)
			//get balance and text details
			let balance_before = new BN(await web3.eth.getBalance(accounts[0]))
			let transaction = await instance.CloseAuditRequest(bytes, {from: accounts[0]})
			let transaction_data = await web3.eth.getTransaction(transaction.receipt.transactionHash)
			let txt_cost = transaction.receipt.gasUsed * transaction_data.gasPrice;
			let BNtxt_cost = new BN(txt_cost);
			//test 1 - audit status to closed
			let audit = await instance.audits.call(bytes);
			assert.equal(audit[4].toString(), "true", "CloseAuditRequest(): status of report not closed")
			//test 2 - deduct total reward
			let total = await instance.totalRewardAvailable.call()
			let total_diff = total_before.sub(total)
			let amount = new BN(audit_before[2]);
			assert.equal(total_diff.toString(), amount.toString(), "CloseAuditRequest(): reward not deducted from total")
			//test 3 - balance audit is zero
			assert.equal(audit[2].toString(), "0", "CloseAuditRequest(): audit balance not zero")
			//test 4 - remove index
			let index_pending = await instance.indexPending.call()
			assert.equal(index_pending.toString(), "0", "CloseAuditRequest(): audit index pending not zero")
			//test 5 - transfer balance to owner audit
			let balance = new BN(await web3.eth.getBalance(accounts[0]))
			let balance_diff = balance.sub(balance_before)
			let amount_check = amount.sub(BNtxt_cost)
			assert.equal(balance_diff.toString(), amount_check.toString(), "CloseAuditRequest(): transfer not send to audit owner")	
		});
	});
})
