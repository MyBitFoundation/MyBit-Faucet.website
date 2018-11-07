import React from 'react';
import PropTypes from 'prop-types';
import BlockchainInfoContext from './BlockchainInfoContext';
import * as Core from '../../../utils/core';
import Web3 from '../../../utils/core';

class BlockchainInfo extends React.Component {
  constructor(props) {
    super(props);

    this.loadMetamaskUserDetails = this.loadMetamaskUserDetails.bind(this);
    this.getCurrentBlockNumber = this.getCurrentBlockNumber.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.getNetwork = this.getNetwork.bind(this);
    this.getBlock = this.getBlock.bind(this);

    this.state = {
      loading: {
        user: true,
        transactionHistory: true,
        network: true,
      },
      transactions: [],
      user: {
        myBitBalance: 0,
        etherBalance: 0,
        userName: ""
      },
      createTrust: this.createTrust,
      currentBlock: 0,
      getTransactions: this.getTransactions,
      withdraw: this.withdraw,
      //can be ropsten or main - else unknown
      network: ""
    };
  }

  async componentWillMount() {
    // this.getTransactions();
    this.loadMetamaskUserDetails();
    try {
      //we need this to pull the user details
      await this.getNetwork();

      // we need the prices and the user details before doing anything
      await Promise.all([this.loadMetamaskUserDetails(this.state.network), this.getCurrentBlockNumber()]);
      // do{
      //   await this.checkAddressAllowed();
      // }while(!this.state.user.userName)
      // await this.getTransactions();
    } catch (err) {
      console.log(err);
    }
  }

  async getNetwork() {
    try {
      new Promise(async (resolve, reject) => {
        let network = await Web3.eth.net.getNetworkType();

        this.setState({
          network, loading: {
            ...this.state.loading,
            network: false,
          }
        }, () => resolve())
      });
    } catch (err) {
      setTimeout(this.getNetwork, 1000);
    }
  }

  async componentWillUnmount() {
    clearInterval(this.getUserDetailsInterval);
  }

  async getBlock(blockNumber) {
    return await Web3.eth.getBlock(blockNumber);
  }
  

  async getCurrentBlockNumber() {
    try {
      const currentBlock = await Web3.eth.getBlockNumber();
      this.setState({ currentBlock })
    } catch (err) {
      setTimeout(this.getCurrentBlockNumber, 1000);
    }
  }


  withdraw(contractAddress) {
    return Core.withdraw(contractAddress, this.state.user.userName, this.state.network, this.getTransactions);
  }

  async getTransactions() {
    this.setState({loading: {...this.state.loading, transactionHistory: true}})
    await Core.getFaucetLog(this.state.network).then(async (response) => {
      const userAddress = this.state.user.userName;
      // const receivedTransactionsTmp = [];
      const transactions = [];
      console.log(response);
      await response.forEach(async (transaction) => {
        if (transaction.returnValues._sender === userAddress) {
          var transactionBlock = await this.getBlock(transaction.blockNumber);
          transactions.push({
            sender: transaction.returnValues._sender,
            amount: transaction.returnValues._amountMYB / 1000000000000000000,
            transactionHash: transaction.transactionHash,
            timestamp: transactionBlock.timestamp
          })
        }
      })
      this.setState({
        transactions,
        loading: {
          ...this.state.loading,
          transactionHistory: false,
        }
      })

    }).catch((err) => {
      console.log(err);
    });
  }

  async loadMetamaskUserDetails() {
    await Core.loadMetamaskUserDetails(this.state.network)
      .then((response) => {
        this.setState({
          user: response,
          loading: { ...this.state.loading, user: false },
        }, this.getTransactions);
      })
      .catch((err) => {
        setTimeout(this.loadMetamaskUserDetails, 1000);
      });
  }

  render() {
    return (
      <BlockchainInfoContext.Provider value={this.state}>
        {this.props.children}
      </BlockchainInfoContext.Provider>
    );
  }
}

export default BlockchainInfo;

BlockchainInfo.propTypes = {
  children: PropTypes.node.isRequired,
};
