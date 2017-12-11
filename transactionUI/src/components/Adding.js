import React, {Component} from 'react';
import {transactionsContract, ETHEREUM_CLIENT} from '../Contract';
import * as EthUtil from 'ethereumjs-util';

const styles = {
  button: {
    backgroundColor: 'white',
    border: '1px solid gray',
    borderRadius: 5,
    cursor: 'pointer'
  },
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    margin: 10
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
  }
}

export class Adding extends Component {

  constructor(props) {
    super(props)
    this.state = {
      clientId: '',
      firstName: '',
      lastName: ''
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.headerTitle}>
          Adding new client
        </div>
        <div style={styles.container}>
          <input
            placeholder='Client id...'
            style={styles.input}
            value={this.state.clientId}
            onChange={(e) => this.setState({clientId: e.target.value})}/>
          <input
            placeholder='First name...'
            style={styles.input}
            value={this.state.firstName}
            onChange={(e) => this.setState({firstName: e.target.value})}/>
          <input
            placeholder='Last name...'
            style={styles.input}
            value={this.state.lastName}
            onChange={(e) => this.setState({lastName: e.target.value})}/>
        </div>
        <a onClick={this.addNewClient} style={styles.button}>
          Add Client
        </a>
      </div>
    );
  }

  addNewClient = () => {
    const {clientId, firstName, lastName} = this.state;
    if (!EthUtil.isValidAddress(clientId)) {
      return false;
    }
    this.setState({clientId: '', firstName: '', lastName: ''})
    return transactionsContract.addClientToBank(clientId, firstName, lastName, {
      from: ETHEREUM_CLIENT.eth.defaultAccount,
      gas: 100000
    });
  }

}