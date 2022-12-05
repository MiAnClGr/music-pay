export default [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_artistFactory",
        "type": "address"
      }
    ],
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
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_artist",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_artistName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_bookingAgentName",
        "type": "string"
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
        "internalType": "string",
        "name": "_venueName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_date",
        "type": "string"
      }
    ],
    "name": "createBooking",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]