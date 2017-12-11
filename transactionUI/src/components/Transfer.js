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

export class Transfer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            privateKey: '',
            senderId: '',
            receiverId: '',
            amount: ''
        }
    }

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.headerTitle}>
                    Transfer money
                </div>
                <div style={styles.container}>
                    <input
                        placeholder='Private key...'
                        style={styles.input}
                        value={this.state.privateKey}
                        onChange={(e) => this.setState({privateKey: e.target.value})}/>
                    <input
                        placeholder='Sender address...'
                        style={styles.input}
                        value={this.state.senderId}
                        onChange={(e) => this.setState({senderId: e.target.value})}/>
                    <input
                        placeholder='Receiver address...'
                        style={styles.input}
                        value={this.state.receiverId}
                        onChange={(e) => this.setState({receiverId: e.target.value})}/>
                    <input
                        placeholder='Amount...'
                        style={styles.input}
                        value={this.state.amount}
                        onChange={(e) => this.setState({amount: e.target.value})}/>
                </div>
                <a onClick={this.transfer} style={styles.button}>
                    Transfer Money
                </a>
            </div>
        );
    }

    hexToBytes = (hex) => {
        for (var bytes = [], c = 0; c < hex.length; c += 2) 
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    }

    privateKeyToAddress = (privateKey) => {
        return `0x${EthUtil
            .privateToAddress(this.hexToBytes(privateKey))
            .toString('hex')}`
    }

    keyPairMatch = (privateKey, walletAddress) => {
        if (this.privateKeyToAddress(privateKey) === walletAddress) {
            return true;
        } else {
            return false;
        }
    }

    transfer = () => {
        const {privateKey, senderId, receiverId, amount} = this.state;
        if (this.keyPairMatch(privateKey, senderId)) {

        }
        return transactionsContract.transfer(senderId, receiverId, amount, {
            from: ETHEREUM_CLIENT.eth.defaultAccount,
            gas: 200000
        });
    }

}