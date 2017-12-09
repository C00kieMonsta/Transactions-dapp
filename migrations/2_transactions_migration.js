var Transactions = artifacts.require("./Transactions.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Transactions, accounts[0], 'Antoine', 'Boxho');
};