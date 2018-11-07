import dayjs from 'dayjs';
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

const burnValue = "250";
const burnValueWei = Web3.utils.toWei(burnValue, 'ether');

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

export const getApprovalLogs = async (network) =>
  new Promise(async (resolve, reject) => {
    try {

      const mybitTokenContract = getContract("MyBitToken", network);

      const logApprovals = await mybitTokenContract.getPastEvents(
        'Approval',
        { fromBlock: 0, toBlock: 'latest' },
      );

      resolve(logApprovals);

    } catch (error) {
      reject(error);
    }
  });

export const requestApproval = async (address, network) =>
  new Promise(async (resolve, reject) => {
    try {
      const burnerAddress = network === "ropsten" ? MyBitBurnerRopsten.ADDRESS : MyBitBurnerMainnet.ADDRESS;
      const mybitTokenContract = getContract("MyBitToken", network);

      const estimatedGas = await mybitTokenContract.methods.approve(burnerAddress, burnValueWei).estimateGas({from: address});
      const gasPrice = await Web3.eth.getGasPrice();

      const approveResponse = await mybitTokenContract.methods
        .approve(burnerAddress, burnValueWei)
        .send({
          from: address,
          gas: estimatedGas,
          gasPrice: gasPrice
        });

      const { transactionHash } = approveResponse;

      checkTransactionStatus(transactionHash, resolve, reject, network);

    } catch (error) {
      reject(error);
    }
  });

export const getAllowanceOfAddress = async (address, network) =>
  new Promise(async (resolve, reject) => {
    try {

      const mybitTokenContract = getContract("MyBitToken", network);

      const allowance = await mybitTokenContract.methods.allowance(address, network === "ropsten" ? MyBitBurnerRopsten.ADDRESS : MyBitBurnerMainnet.ADDRESS ).call();
      resolve(allowance >= burnValueWei);

    } catch (error) {
      reject(error);
    }
  });

export const getTrustLog = async (network) =>

  new Promise(async (resolve, reject) => {
    try {
      const trustContract = getContract("TrustFactory", network);

      const logTransactions = await trustContract.getPastEvents(
        'LogNewTrust',
        { fromBlock: 0, toBlock: 'latest' },
      );

      resolve(logTransactions);
    } catch (error) {
      reject(error);
    }
  });

export const getFaucetLog = async (network) =>
  new Promise(async (resolve, reject) => {
    try {
      const faucetContract = getContract("MyBitFaucet", network);

      const logTransactions = await faucetContract.getPastEvents(
        'LogWithdraw',
        { fromBlock: 0, toBlock: 'latest' },
      );
      resolve(logTransactions);
    } catch (error) {
      reject(error);
    }
  });

export const getWithdrawlsLog = async (contractAddress, network) =>
  new Promise(async (resolve, reject) => {
    try {

      const trustContract = getContract("Trust", network, contractAddress);

      const logWithdawls = await trustContract.getPastEvents(
        'LogWithdraw',
        { fromBlock: 0, toBlock: 'latest' },
      );

      resolve(logWithdawls);
    } catch (error) {
      reject(error);
    }
  });

  export const getDepositsLog = async (contractAddress, network) =>
    new Promise(async (resolve, reject) => {
      try {

        const trustContract = getContract("Trust", network, contractAddress);

        const logDeposits = await trustContract.getPastEvents(
          'LogDeposit',
          { fromBlock: 0, toBlock: 'latest' },
        );

        resolve(logDeposits);
      } catch (error) {
        reject(error);
      }
    });

export const createTrust = async (from, to, amount, revokable, deadline, network) =>
  new Promise(async (resolve, reject) => {
    try {
      const trustContract = getContract("TrustFactory", network);

      const weiAmount = Web3.utils.toWei(amount.toString(), 'ether');
      const estimatedGas = await trustContract.methods.deployTrust(to, revokable, deadline).estimateGas({from: from, value: weiAmount});
      const gasPrice = await Web3.eth.getGasPrice();


      const trustResponse = await trustContract.methods
        .deployTrust(to, revokable, deadline)
        .send({
          value: weiAmount,
          from: from,
          gas: estimatedGas,
          gasPrice: gasPrice
        });

      const { transactionHash } = trustResponse;

      checkTransactionStatus(transactionHash, resolve, reject, network);
    } catch (error) {
      reject(error);
    }
  });


export const isWithdrawable = async (contractAddress, network) =>
  new Promise(async (resolve, reject) => {
    try {

      const trustContract = getContract("Trust", network, contractAddress);

      const secondsUntilDeadline = await trustContract.methods.blocksUntilExpiration().call();
      resolve(secondsUntilDeadline === '0');
    } catch (error) {
      reject(error);
    }
  });

export const withdraw = async (contractAddress, user, network, callback) =>
  new Promise(async (resolve, reject) => {
    try {

      const faucetContract = getContract("MyBitFaucet", network, contractAddress);
      console.log(faucetContract);
      // const estimatedGas = await faucetContract.methods.withdraw('ripplesuck').estimateGas({from: user});
      // const gasPrice = await Web3.eth.getGasPrice();

      const withdrawResponse = await faucetContract.methods.withdraw('ripplesucks')
        .send({
          from: user,
          // gas: estimatedGas,
          // gasPrice: gasPrice
        });

      console.log(withdrawResponse);
      const { transactionHash } = withdrawResponse;

      checkTransactionStatus(transactionHash, resolve, reject, network, callback);
    } catch (error) {
      reject(error);
    }
  });

const checkTransactionStatus = async (
  transactionHash,
  resolve,
  reject,
  network,
  callback
) => {
  try {
    const endpoint = ETHERSCAN_TX(transactionHash, network);
    const result = await fetch(endpoint);
    const jsronResult = await result.json();
    if (jsronResult.status === '1') {
      //checkTransactionConfirmation(transactionHash, resolve, reject, network);
      resolve(true)
      callback();
    } else if (jsronResult.status === '0') {
      resolve(false);
      callback();
    } else {
      setTimeout(
        () => checkTransactionStatus(transactionHash, resolve, reject, network),
        1000,
      );
    }
  } catch (err) {
    reject(err);
  }
};

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
