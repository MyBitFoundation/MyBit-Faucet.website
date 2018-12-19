import getWeb3Async from './web3';
import * as TrustFactoryRopsten from '../constants/contracts/ropsten/TrustFactory';
import * as TrustRopsten from '../constants/contracts/ropsten/Trust';
import * as MyBitBurnerRopsten from '../constants/contracts/ropsten/MyBitBurner';
import * as MyBitTokenRopsten from '../constants/contracts/ropsten/MyBitToken';
import * as MyBitFaucetRopsten from '../constants/contracts/ropsten/MyBitFaucet';

import * as TrustFactoryMainnet from '../constants/contracts/mainnet/TrustFactory';
import * as TrustMainnet from '../constants/contracts/mainnet/Trust';
import * as MyBitBurnerMainnet from '../constants/contracts/mainnet/MyBitBurner';
import * as MyBitTokenMainnet from '../constants/contracts/mainnet/MyBitToken';

import { ETHERSCAN_TX, ETHERSCAN_TX_FULL_PAGE } from '../constants';
import axios from 'axios';
const Web3 = getWeb3Async();

const getContract = (name, network, address) => {
  let contract = undefined;
  if(network === "ropsten"){
    switch (name) {
      case 'Trust':
        contract = TrustRopsten;
        break;
      case 'TrustFactory':
        contract = TrustFactoryRopsten;
        break;
      case 'MyBitBurner':
        contract = MyBitBurnerRopsten;
        break;
      case 'MyBitToken':
        contract = MyBitTokenRopsten;
        break;
      case 'MyBitFaucet':
        contract = MyBitFaucetRopsten;
        break;
      default: break;
    }
  }
  else {
    switch (name) {
      case 'Trust':
        contract = TrustMainnet;
        break;
      case 'TrustFactory':
        contract = TrustFactoryMainnet;
        break;
      case 'MyBitBurner':
        contract = MyBitBurnerMainnet;
        break;
      case 'MyBitToken':
        contract = MyBitTokenMainnet;
        break;
      default: break;
    }
  }

  return new Web3.eth.Contract(
    contract.ABI,
    address ? address : contract.ADDRESS
  );
}

export const loadMetamaskUserDetails = async (network) =>

  new Promise(async (resolve, reject) => {
    try {
      const accounts = await Web3.eth.getAccounts();
      const balance = await Web3.eth.getBalance(accounts[0]);

      const myBitTokenContract = getContract("MyBitToken", network);

      let myBitBalance = await myBitTokenContract.methods
        .balanceOf(accounts[0])
        .call();

      if(myBitBalance > 0){
        myBitBalance = myBitBalance / Math.pow(10, 18);
      }

      const details = {
        userName: accounts[0],
        ethBalance: Web3.utils.fromWei(balance, 'ether'),
        myBitBalance,
      };
      resolve(details);
    } catch (error) {
      reject(error);
    }
  });

export const getFaucetLog = async (network, filter) => {
  const f = filter  || {};
  console.log(f);
  return new Promise(async (resolve, reject) => {
    try {
      const faucetContract = getContract("MyBitFaucet", network);

      const logTransactions = await faucetContract.getPastEvents(
        'LogWithdraw',
        { filter: f, fromBlock: 0, toBlock: 'latest' },
      );
      resolve(logTransactions);
    } catch (error) {
      reject(error);
    }
  
})};


export const withdraw = async (contractAddress, user, network) =>
  new Promise(async (resolve, reject) => {
    try {

      const faucetContract = getContract("MyBitFaucet", network, contractAddress);
      // const estimatedGas = await faucetContract.methods.withdraw('ripplesuck').estimateGas({from: user});
      // const gasPrice = await Web3.eth.getGasPrice();

      const withdrawResponse = await faucetContract.methods.withdraw('ripplesucks')
        .send({
          from: user,
          // gas: estimatedGas,
          // gasPrice: gasPrice
        }).on('error', (error) => {
          console.error(error);
          resolve(false);
        })
        .then((receipt) => {
          resolve(receipt);
        });
      // const { transactionHash } = withdrawResponse;

      // checkTransactionStatus(transactionHash, resolve, reject, network, faucetContract);
    } catch (error) {
      reject(error);
    }
  });


const checkTransactionConfirmation = async (
  transactionHash,
  resolve,
  reject,
  network,
  ) => {
  try{
    const url = ETHERSCAN_TX_FULL_PAGE(transactionHash, network);
    const response = await axios.get(url);
    var myRe = new RegExp('(<font color=\'green\'>Success</font>)', 'g');
    var r = myRe.exec(response.data);
    if(r.length > 0){
      resolve(true);
    }

    myRe = new RegExp('(<font color=\'red\'>Fail</font>)', 'g');
    r = myRe.exec(response.data);
    if(r.length > 0){
      resolve(false);
    }
    else{
      setTimeout(
        () => checkTransactionConfirmation(transactionHash, resolve, reject),
        1000,
      );
    }
  }catch(err){
    setTimeout(
      () => checkTransactionConfirmation(transactionHash, resolve, reject),
      1000,
    );
  }
}

export default Web3;
