import Web3 from 'web3';

// Ethereum client interacting with our localhost testRPC
export var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
ETHEREUM_CLIENT.eth.defaultAccount = ETHEREUM_CLIENT.eth.accounts[0];

// abi of contract living on the localhost [JSON.stringify]
// contract.then(function(instance) {return JSON.stringify(instance.abi)})
var contractABI = [{"constant":true,"inputs":[],"name":"getClients","outputs":[{"name":"","type":"address[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTransactions","outputs":[{"name":"","type":"address[]"},{"name":"","type":"address[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_money","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_clientId","type":"address"}],"name":"clientExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clientId","type":"address"},{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"}],"name":"addClientToBank","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_clientId","type":"address"}],"name":"getBalance","outputs":[{"name":"_balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_clientId","type":"address"},{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

// Address of contract living on the localhost
// contract.then(function(instance) {return instance.address})
var contractAddress = '0x62859f41b206983991507cbd3fef2506e7b765e9';

// Intsance to contract
export const transactionsContract = ETHEREUM_CLIENT.eth.contract(contractABI).at(contractAddress);