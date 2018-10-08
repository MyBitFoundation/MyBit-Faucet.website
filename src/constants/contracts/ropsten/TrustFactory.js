export const ADDRESS = '0x38d07b2f1f6fcc37b80b9ce4c13adf678ca0097e';
export const ABI = [
{
"constant": false,
"inputs": [
{
"name": "_newFee",
"type": "uint256"
}
],
"name": "changeMYBFee",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [],
"name": "closeFactory",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"anonymous": false,
"inputs": [
{
"indexed": true,
"name": "_trustor",
"type": "address"
},
{
"indexed": true,
"name": "_beneficiary",
"type": "address"
},
{
"indexed": false,
"name": "_trustAddress",
"type": "address"
},
{
"indexed": false,
"name": "_amount",
"type": "uint256"
}
],
"name": "LogNewTrust",
"type": "event"
},
{
"constant": false,
"inputs": [
{
"name": "_beneficiary",
"type": "address"
},
{
"name": "_revokeable",
"type": "bool"
},
{
"name": "_blocksUntilExpiration",
"type": "uint256"
}
],
"name": "deployTrust",
"outputs": [],
"payable": true,
"stateMutability": "payable",
"type": "function"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"name": "_oldFee",
"type": "uint256"
},
{
"indexed": false,
"name": "_newFee",
"type": "uint256"
}
],
"name": "LogMYBFeeChange",
"type": "event"
},
{
"payable": false,
"stateMutability": "nonpayable",
"type": "fallback"
},
{
"inputs": [
{
"name": "_mybTokenBurner",
"type": "address"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"constant": true,
"inputs": [],
"name": "expired",
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
"name": "mybBurner",
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
"constant": true,
"inputs": [],
"name": "mybFee",
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
"name": "owner",
"outputs": [
{
"name": "",
"type": "address"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
}
]
