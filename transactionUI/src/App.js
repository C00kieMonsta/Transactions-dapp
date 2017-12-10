import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import T from 'moment';

// Ethereum client interacting with our localhost testRPC
var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// abi of contract living on the localhost [JSON.stringify]
// contract.then(function(instance) {return JSON.stringify(instance.abi)})
var contractABI = [{"constant":true,"inputs":[],"name":"getClients","outputs":[{"name":"","type":"address[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTransactions","outputs":[{"name":"","type":"address[]"},{"name":"","type":"address[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_money","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_clientId","type":"address"}],"name":"clientExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clientId","type":"address"},{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"}],"name":"addClientToBank","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_clientId","type":"address"}],"name":"getBalance","outputs":[{"name":"_balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_clientId","type":"address"},{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

// Address of contract living on the localhost
// contract.then(function(instance) {return instance.address})
var contractAddress = '0x4ee6e135e711a0b4fcc1a9191b68a629af6b8b27';

// Intsance to contract
var transactionsContract = ETHEREUM_CLIENT.eth.contract(contractABI).at(contractAddress);

const styles = {
  cell: {
    margin: 5,
    padding: 5,
  },
  container: {
  },
  header: {
    backgroundColor: 'lightGray',
    border: '1px solid gray',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
  },
  raw: {
    border: '1px solid gray',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
  },
  tableContainer: {
    width: '50%',
    margin: 20,
  },
}

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      clients: [],
      transactions: [],
    }
  }

  componentWillMount(){
    const rawClient = transactionsContract.getClients();
    var clients = [];
    for (let i = 0; i < String(rawClient[0]).split(',').length; i++) {
      clients.push({
        clientId: String(rawClient[0]).split(',')[i],
        firstName: String(rawClient[1]).split(',')[i],
        lastName: String(rawClient[2]).split(',')[i],
        balance: String(rawClient[3]).split(',')[i],
      })
    }
    const rawTransactions = transactionsContract.getTransactions();
    let transactions = [];
    for (let i = 0; i < String(rawTransactions[0]).split(',').length; i++) {
      transactions.push({
        sender: String(rawTransactions[0]).split(',')[i],
        receiver: String(rawTransactions[1]).split(',')[i],
        timestamp: String(rawTransactions[2]).split(',')[i],
        amount: String(rawTransactions[3]).split(',')[i],
      })
    }
    this.setState({ 
      clients: clients,
      transactions: transactions
    })
    console.log(transactions);
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.tableContainer}>
          <div style={styles.header}>
            <div style={styles.cell}>Client</div>
            <div style={styles.cell}>Balance</div>
          </div>
          {this.state.clients.map(this.renderClient)}
        </div>
        <div style={styles.tableContainer}>
          <div style={styles.header}>
            <div style={styles.cell}>Sender</div>
            <div style={styles.cell}>Receiver</div>
            <div style={styles.cell}>Amount</div>
            <div style={styles.cell}>Timestamp</div>
          </div>
          {this.state.transactions.map(this.renderTransaction)}
        </div>
      </div>
    );
  }

  returnDate = (timestamp) => {
    var t = new Date(0);
    t.setUTCSeconds(timestamp);
    var converted_date = T(t).format("DD/MM/YYYY - hh:MM:ss");
    return converted_date;
  }

  returnClient = (address) => {
    const client = this.state.clients.find((client) => client.clientId === address);
    console.log(this.state.clients);
    console.log(address);
    return client ? `${ETHEREUM_CLIENT.toAscii(client.firstName)} ${ETHEREUM_CLIENT.toAscii(client.lastName)}` : '';
  }

  renderClient = (client) => {
    return (
      <div style={styles.raw} key={client.clientId}>
        <div style={styles.cell}>{this.returnClient(client.clientId)}</div>
        <div style={styles.cell}>{client.balance}</div>
      </div>
    )
  }

  renderTransaction = (transaction) => {
    return (
      <div style={styles.raw} key={transaction.timestamps}>
        <div style={styles.cell}>{this.returnClient(transaction.sender)}</div>
        <div style={styles.cell}>{this.returnClient(transaction.receiver)}</div>
        <div style={styles.cell}>{transaction.amount}</div>
        <div style={styles.cell}>{this.returnDate(transaction.timestamp)}</div>
      </div>
    )
  }
}

export default App;