export default [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bool",
          "name": "_depositPaid",
          "type": "bool"
        }
      ],
      "name": "BookingFeePaid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_payment",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_time",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_venueName",
          "type": "string"
        }
      ],
      "name": "BookingMade",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_artist",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "_artistName",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_payment",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_time",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "_date",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_venueName",
          "type": "bytes32"
        }
      ],
      "name": "createBooking",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]