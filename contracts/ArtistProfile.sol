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

// Events

    event BookingMade (address _artist, address _bookingAgent);
    event DepositPaid (uint _gigNumber);
    event EscrowCreated (address _escrowAddress);

// State Variables

    struct Booking {
        address artist;
        string artistName;
        address bookingAgent; 
        string bookingAgentName;
        

        uint payment;
        uint time;
        uint gigNumber;

        string venueName;
        string date;
        bool agreed;
    
        State currentState;   
    }


    uint256 gigNumber;

    string public artistName;
    address public artist;

    string public aboutMe;

    mapping(uint => Booking) public bookings;

    mapping(address => address) public bookingAgentToEscrow;

    mapping(uint => address) public bookingNumberToEscrow;

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
        string memory _artistName,
        address _bookingAgent,
        string memory _bookingAgentName,
        uint _payment, 
        uint _time,
        string memory _venueName, 
        string memory _date
        
        ) external {

        Booking storage booking = bookings[gigNumber];

        {
        booking.artist = _artist;
        booking.artistName = _artistName;
        booking.bookingAgent = _bookingAgent;
        booking.bookingAgentName  = _bookingAgentName;
        booking.payment = _payment;
        booking.time = _time;
        booking.venueName = _venueName;
        booking.date = _date;
        
        
        booking.gigNumber = gigNumber;
        }

        gigNumber ++;

        emit BookingMade(_artist, _bookingAgent);
    }

 
    function updateAboutMe(string memory _update) external {
        aboutMe = _update;
    }

    function agreement(uint _gigNumber) external onlyArtist {
        Booking storage booking = bookings[_gigNumber];
        booking.agreed = true;

        escrow =  new BookingEscrow(
            booking.artist,
            booking.artistName,
            booking.bookingAgent,
            booking.bookingAgentName,
            booking.gigNumber, 
            booking.payment
        );

        bookingAgentToEscrow[booking.bookingAgent] = address(escrow);
        bookingNumberToEscrow[_gigNumber] = address(escrow);

        emit DepositPaid(_gigNumber);
        emit EscrowCreated(address(escrow));
    
    }

    function withdraw() external {
        require(msg.sender == artist);
        DAI.transfer(msg.sender, DAI.balanceOf(address(this)));
    }

/// View

    
    function getBooking(uint _gigNumber) external view
        returns(
            uint256,
            uint256,
            uint256,
            string memory,
            string memory,
            address
            ) {

        Booking storage booking = bookings[_gigNumber];

        return (
            booking.gigNumber,
            booking.payment,
            booking.time,
            booking.date, 
            booking.venueName,
            booking.bookingAgent
            );
    }

    function balance() public view returns(uint) {
        return DAI.balanceOf(address(this));
    }

  
}