// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.19;

import "./BookingEscrow.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ArtistProfile {
    using Strings for uint256;

    ArtistFactory artistFactory;
    BookingEscrow escrow;
    ERC20 DAI;

// Events

    event BookingMade (address _artist, address _bookingAgent);
    event DepositPaid (uint _gigNumber);
    event EscrowCreated (address _escrowAddress);

// State Variables

    struct Booking {
        address artistProfile;
        string artistName;
        address bookingAgent; 
        string bookingAgentName;
        

        uint payment;
        uint time;
        uint gigNumber;

        string venueName;
        string date;
        bool agreed;
        bool completed;   
    }


    uint256 gigNumber;

    string public artistName;
    address public artist;
    address public artistFactoryAddress;

    string public aboutMe;
    string public profilePicURL;

    mapping(uint => Booking) public bookings;

    mapping(address => address) public bookingAgentToEscrow;

    mapping(uint => address) public bookingNumberToEscrow;

/// Modifiers 

    modifier onlyArtist() {
        require(msg.sender == artist);
        _;    
    }

/// Constructor

    constructor(string memory _artistName, address _artist, address _daiAddress) {
        artistName = _artistName;
        artist = payable(_artist);
        DAI = ERC20(_daiAddress);
        artistFactoryAddress = msg.sender;
        artistFactory = ArtistFactory(msg.sender);
        
    }

/// Receive

    receive() external payable {}

/// External

    function createBooking(
        address _artistProfile,
        string memory _artistName,
        string memory _bookingAgentName,
        uint _payment, 
        uint _time,
        string memory _venueName, 
        string memory _date
        
        ) external {
        require(artistFactory.doesArtistExist(_artistName));

        Booking storage booking = bookings[gigNumber];

        {
        booking.artistProfile = _artistProfile;
        booking.artistName = _artistName;
        booking.bookingAgent = msg.sender;
        booking.bookingAgentName  = _bookingAgentName;
        booking.payment = _payment;
        booking.time = _time;
        booking.venueName = _venueName;
        booking.date = _date;
        
        
        booking.gigNumber = gigNumber;
        }

        gigNumber ++;

        emit BookingMade(_artistProfile, msg.sender);
    }

 
    function updateAboutMe(string memory _update) external {
        aboutMe = _update;
    }

    function updateProfilePicURL(string memory _url) external {
        profilePicURL = _url;
    }

    function agreement(uint _gigNumber) external onlyArtist {
        Booking storage booking = bookings[_gigNumber];
        booking.agreed = true;

        escrow =  new BookingEscrow(
            artist,
            booking.artistName,
            booking.bookingAgent,
            booking.bookingAgentName,
            booking.gigNumber, 
            booking.payment,
            booking.time,
            booking.venueName,
            booking.date,
            payable(address(DAI)),
            artistFactoryAddress
            
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

    function completeBooking(uint _gigNumber) external {
        Booking storage booking = bookings[_gigNumber];
        
        booking.completed = true;
    }

/// View

    
    function getBooking(uint _gigNumber) external view
        returns(
            uint256,
            uint256,
            uint256,
            string memory,
            string memory,
            address,
            bool,
            bool
            ) {

        Booking storage booking = bookings[_gigNumber];

        return (
            booking.gigNumber,
            booking.payment,
            booking.time,
            booking.date, 
            booking.venueName,
            booking.bookingAgent,
            booking.agreed,
            booking.completed
            );
    }

    function balance() public view returns(uint) {
        return DAI.balanceOf(address(this));
    }

  
}