export default [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_artistName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_artist",
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
        "internalType": "address",
        "name": "_artist",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_bookingAgent",
        "type": "address"
      }
    ],
    "name": "BookingMade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_gigNumber",
        "type": "uint256"
      }
    ],
    "name": "DepositPaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_escrowAddress",
        "type": "address"
      }
    ],
    "name": "EscrowCreated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "aboutMe",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_gigNumber",
        "type": "uint256"
      }
    ],
    "name": "agreement",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "artist",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "artistName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "balance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "bookings",
    "outputs": [
      {
        "internalType": "address",
        "name": "artist",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "artistName",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "bookingAgent",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "bookingAgentName",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "payment",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "gigNumber",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "venueName",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "date",
        "type": "bytes32"
      },
      {
        "internalType": "bool",
        "name": "agreed",
        "type": "bool"
      },
      {
        "internalType": "enum ArtistProfile.State",
        "name": "currentState",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_update",
        "type": "string"
      }
    ],
    "name": "updateAboutMe",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_artist",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_bookingAgent",
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
    "name": "updateBooking",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]