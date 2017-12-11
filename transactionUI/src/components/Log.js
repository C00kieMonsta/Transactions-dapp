import React, {Component} from 'react';
import T from 'moment';

import {transactionsContract, ETHEREUM_CLIENT} from '../Contract';

const styles = {
  cell: {
    margin: 5,
    padding: 5
  },
  header: {
    backgroundColor: 'whiteSmoke',
    border: '1px solid gray',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between'
  },
  headerTitle: {
    backgroundColor: 'lightGray',
    border: '1px solid gray',
    padding: 5
  },
  input: {
    backgroundColor: 'white',
    borderBottomColor: 'lightlightGray',
    borderWidth: '0px 0px 1px 0px',
    cursor: 'text',
    outline: 'none',
    padding: 10,
    margin: 10
  },
  raw: {
    border: '1px solid gray',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between'
  },
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    margin: 10
  },
  tableContainer: {
    margin: 20
  }
}

export class Log extends Component {

  constructor(props) {
    super(props)
    this.state = {
      clients: [],
      transactions: []
    }
  }

  componentWillMount() {
    const rawClient = transactionsContract.getClients();
    var clients = [];
    for (let i = 0; i < String(rawClient[0]).split(',').length; i++) {
      clients.push({
        clientId: String(rawClient[0]).split(',')[i],
        firstName: String(rawClient[1]).split(',')[i],
        lastName: String(rawClient[2]).split(',')[i],
        balance: String(rawClient[3]).split(',')[i]
      })
    }
    const rawTransactions = transactionsContract.getTransactions();
    let transactions = [];
    for (let i = 0; i < String(rawTransactions[0]).split(',').length; i++) {
      transactions.push({
        sender: String(rawTransactions[0]).split(',')[i],
        receiver: String(rawTransactions[1]).split(',')[i],
        timestamp: String(rawTransactions[2]).split(',')[i],
        amount: String(rawTransactions[3]).split(',')[i]
      })
    }
    this.setState({clients: clients, transactions: transactions})
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.headerTitle}>
          Log of transactions
        </div>
        <div style={styles.tableContainer}>
          <div style={styles.header}>
            <div style={styles.cell}>Client</div>
            <div style={styles.cell}>Wallet Address</div>
            <div style={styles.cell}>Balance</div>
          </div>
          {this
            .state
            .clients
            .map(this.renderClient)}
        </div>
        <div style={styles.tableContainer}>
          <div style={styles.header}>
            <div style={styles.cell}>Sender</div>
            <div style={styles.cell}>Receiver</div>
            <div style={styles.cell}>Amount</div>
            <div style={styles.cell}>Timestamp</div>
          </div>
          {this
            .state
            .transactions
            .map(this.renderTransaction)}
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
    const client = this
      .state
      .clients
      .find((client) => client.clientId === address);
    return client
      ? `${ETHEREUM_CLIENT.toAscii(client.firstName)} ${ETHEREUM_CLIENT.toAscii(client.lastName)}`
      : '';
  }

  renderClient = (client) => {
    return (
      <div style={styles.raw} key={client.clientId}>
        <div style={styles.cell}>{this.returnClient(client.clientId)}</div>
        <div style={styles.cell}>{client.clientId}</div>
        <div style={styles.cell}>{client.balance}</div>
      </div>
    )
  }

  renderTransaction = (transaction) => {
    return (
      <div style={styles.raw} key={transaction.timestamp}>
        <div style={styles.cell}>{this.returnClient(transaction.sender)}</div>
        <div style={styles.cell}>{this.returnClient(transaction.receiver)}</div>
        <div style={styles.cell}>{transaction.amount}</div>
        <div style={styles.cell}>{this.returnDate(transaction.timestamp)}</div>
      </div>
    )
  }
}
