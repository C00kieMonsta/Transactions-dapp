import React, {Component} from 'react';

import {Log} from './components/Log';
import {Adding} from './components/Adding';
import {Transfer} from './components/Transfer';

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'row nowrap',
    margin: 40
  },
  input: {
    backgroundColor: 'white',
    borderBottomColor: 'lightlightGray',
    borderWidth: '0px 0px 1px 0px',
    cursor: 'text',
    outline: 'none',
    padding: 10
  }
}

class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Log/>
        <Adding/>
        <Transfer/>
      </div>
    );
  }
}

export default App;