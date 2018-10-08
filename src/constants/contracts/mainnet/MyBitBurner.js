export const ADDRESS = '0x507ca44958dfd52eda1e2cf4ac368d7553962ea3';
export const ABI = [
{
"constant": false,
"inputs": [
{
"name": "_burningContract",
"type": "address"
}
],
"name": "removeBurner",
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
"inputs": [
{
"name": "_burningContract",
"type": "address"
}
],
"name": "authorizeBurner",
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
},
{
"constant": false,
"inputs": [
{
"name": "_tokenHolder",
"type": "address"
},
{
"name": "_amount",
"type": "uint256"
}
],
"name": "burn",
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
"name": "mybToken",
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
"inputs": [
{
"name": "",
"type": "address"
}
],
"name": "authorizedBurner",
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
"inputs": [
{
"name": "_myBitTokenAddress",
"type": "address"
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
"indexed": true,
"name": "_tokenHolder",
"type": "address"
},
{
"indexed": true,
"name": "_burningContract",
"type": "address"
},
{
"indexed": false,
"name": "_amount",
"type": "uint256"
}
],
"name": "LogMYBBurned",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"name": "_owner",
"type": "address"
},
{
"indexed": false,
"name": "_burningContract",
"type": "address"
}
],
"name": "LogBurnerAuthorized",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"name": "_owner",
"type": "address"
},
{
"indexed": false,
"name": "_burningContract",
"type": "address"
}
],
"name": "LogBurnerRemoved",
"type": "event"
}
]
