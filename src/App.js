import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './views';

import BlockchainInfo from './modules/Blockchain/containers/BlockchainInfo';
import BlockchainContext from './modules/Blockchain/containers/BlockchainInfoContext';
// import './App.css';

const blue = '#1890ff';
const lightBlue = '#e6f7ff';
const blueHover = '#40a9ff';
const blueActive = '#096dd9';

class App extends Component {
  render() {
    return (
      <BlockchainInfo>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
          </Switch>
        </Router>
      </BlockchainInfo>
    );
  }
}

export default App;
