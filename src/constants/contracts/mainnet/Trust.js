export const ABI = [
{
"constant": true,
"inputs": [],
"name": "trustBalance",
"outputs": [
{
"name": "",
"type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "beneficiary",
"outputs": [
{
"name": "",
"type": "address"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [],
"name": "withdraw",
"outputs": [
{
"name": "",
"type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "expiration",
"outputs": [
{
"name": "",
"type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"name": "_numBlocks",
"type": "uint256"
}
],
"name": "changeExpiration",
"outputs": [
{
"name": "",
"type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "revocable",
"outputs": [
{
"name": "",
"type": "bool"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [],
"name": "revoke",
"outputs": [
{
"name": "",
"type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "alreadyDeposited",
"outputs": [
{
"name": "",
"type": "bool"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "blocksUntilExpiration",
"outputs": [
{
"name": "",
"type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"name": "_beneficiary",
"type": "address"
}
],
"name": "changeBeneficiary",
"outputs": [
{
"name": "",
"type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [],
"name": "depositTrust",
"outputs": [],
"payable": true,
"stateMutability": "payable",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "trustor",
"outputs": [
{
"name": "",
"type": "address"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
"name": "_trustor",
"type": "address"
},
{
"name": "_beneficiary",
"type": "address"
},
{
"name": "_revocable",
"type": "bool"
},
{
"name": "_expiration",
"type": "uint256"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"payable": false,
"stateMutability": "nonpayable",
"type": "fallback"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"name": "_sender",
"type": "address"
},
{
"indexed": false,
"name": "_amount",
"type": "uint256"
}
],
"name": "LogDeposit",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"name": "_beneficiary",
"type": "address"
},
{
"indexed": false,
"name": "_amount",
"type": "uint256"
}
],
"name": "LogWithdraw",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"name": "_oldBeneficiary",
"type": "address"
},
{
"indexed": false,
"name": "_newBeneficiary",
"type": "address"
}
],
"name": "LogNewBeneficiary",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"name": "_trustor",
"type": "address"
},
{
"indexed": false,
"name": "_amount",
"type": "uint256"
}
],
"name": "LogTrustRevoked",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"name": "_oldExpiration",
"type": "uint256"
},
{
"indexed": false,
"name": "_newExpiration",
"type": "uint256"
}
],
"name": "LogExpirationChanged",
"type": "event"
}
]
