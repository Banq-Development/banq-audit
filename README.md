# Banq_audit
As a developer code audits are vital to the safety of your program and users. Currently finding an auditor is a non trivial task. You have to search and request quotes. Banq audit aims to make audits more accessable for developers by creating a marketplace for (opensource smart contract) code audits.  

For the beta go to: [banq.dev](https://banq.dev).

## Description
Banq audit is a decentralized marketplace. Everyone can open an audit request (become auditee) and set their own amount of reward for the audit and potential bugs found. Everyone can become an auditor and submit reports for the requested audits and earn rewards. Based on succcesfull audit execution the auditee and auditor will receive reliability points. If there is a disagreement reliability points will be deducted from the auditor/auditee. For example the auditee did not receive a report, then the points are deducted from the auditor that submitted the report.

By implementing a reliability point system auditee can have audits from auditors with a minimal amount of reliability and auditors can select auditee with minimal reliability points to be sure of reward payout.

## Instructions deployment smart contracts
1. Clone this repository.
2. Go to the cloned directory `cd \path\cloned\directory`.
3. Add network data to truffle-config.js file.
4. Migrate to network: `truffle migrate --network [network_name]`.

## Test smart contracts run front-end 
1. Go to the cloned directory `cd \path\cloned\directory`.
2. Start the test scripts `truffle test`.

## Instructions run front-end 
1. Clone this repository.
2. Go to the dapp directory `cd \path\cloned\directory\dapp`.
3. Install dependencies: `npm install`.
4. Start application `npm start`.

*If you deployed your own instance of the smart contracts adjust the contract addresses in the front end files admin.js, auth.js and report.js.

## Current instance deployed contracts 
Main
- **BanqAudit.sol**: 0x777DEFE54A17C2A2534E05961e38556F93C56A35 
- **ConvertBytes.sol**: 0x3f77BFda356d8081842dE51cF4d167A699d328b7

Ropsten
- **BanqAudit.sol**: 0x0571727FBA960DaaEEb1bC15db12839Fe8251ed2 
- **ConvertBytes.sol**: 0x915c29f77161F08990AD812cDcf15E993aBC6C00

If you have comments or would like to contribute. Please contact us at support@banq.link.
