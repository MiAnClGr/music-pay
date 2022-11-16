// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

import "./BookingEscrow.sol";
import "./ProofOfBooking.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ArtistProfile {
    using Strings for uint256;

    BookingEscrow escrow;
    ProofOfBooking proofOfBooking;
    ERC20 DAI;

// State Variables

    struct Booking {
        address artist;
        bytes32 artistName;
        address bookingAgent; 
        bytes32 bookingAgentName;
        

        uint payment;
        uint time;
        uint gigNumber;

        bytes32 venueName;
        bytes32 date;
        bool agreed;
    
        State currentState;   
    }

    uint256 gigNumber;

    string public artistName;
    address public artist;

    string public aboutMe;

    mapping(uint => Booking) public bookings;

    enum State {notCompleted, bookingComplete, performanceCompleted, paymentComplete}

/// Modifiers 

    modifier onlyArtist() {
        require(msg.sender == artist);
        _;    
    }

/// Constructor

    constructor(string memory _artistName, address _artist) {
        artistName = _artistName;
        artist = payable(_artist);
        DAI = ERC20(0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60);
    }

/// Receive

    receive() external payable {}

/// External

    function updateBooking(
        address _artist,
        address _bookingAgent,
        bytes32 _artistName,
        uint _payment, 
        uint _time, 
        bytes32 _date, 
        bytes32 _venueName
        ) external {

        Booking storage booking = bookings[gigNumber];

        {
        booking.artist = _artist;
        booking.artistName = _artistName;
        booking.payment = _payment;
        booking.time = _time;
        booking.date = _date;
        booking.venueName = _venueName;
        booking.bookingAgent = _bookingAgent;
        }

        // escrow =  new BookingEscrow(booking.artist, msg.sender, gigNumber, _payment, address(this), address(proofOfPayment));
        // address escrowAddress = address(escrow);
        // gigNumberToEscrowAddress[gigNumber] = escrowAddress;

        // proofOfBooking.mintProofOfBooking(artist, gigNumber, _artistName, _payment.toString(), _date, _venueName);

    }

    function updateAboutMe(string memory _update) external {
        aboutMe = _update;
    }

    function agreement(uint _gigNumber) external onlyArtist {
        Booking storage booking = bookings[_gigNumber];

        booking.agreed = true;
        
    }

    function withdraw() external {
        require(msg.sender == artist);
        DAI.transfer(msg.sender, DAI.balanceOf(address(this)));
    }

/// View

    function balance() public view returns(uint) {
        return DAI.balanceOf(address(this));
    }

  
}