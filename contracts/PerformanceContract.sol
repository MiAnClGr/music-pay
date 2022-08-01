// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

contract PerformanceContract {

// State Variables

    struct Booking {

        uint payment;
        uint time;
        uint agreementTime;
        uint gigNumber;

        string venueName;
        string date;
        string extraInfo;

        bool agreed;
        bool depositPaid;
        bool hasArtistAgreed;

        address bookingAgent; 

        State currentState;   

    }

    uint gigNumber;

    address owner;

    mapping(uint => Booking) public Bookings;

    enum State {notCompleted, bookingComplete, performanceCompleted, paymentComplete}

    
// Events

    event BookingMade (uint _payment, uint _time, string _venueName);
    event BookingFeePaid (bool _depositPaid);

// Modifiers

    modifier onlyOwner() {  
        require(msg.sender == owner);
        _;
    }

// Constructor

    constructor(address artist) {
        artist == owner;
    }

// Public

    // Create the Booking - intialiased by the booking agent

    function createBooking(
        uint _payment, 
        uint _time, 
        string memory _date, 
        string memory _extraInfo, 
        string memory _venueName
        ) public {
        
        Booking storage booking = Bookings[gigNumber];

        booking.payment = _payment;
        booking.time = _time;
        booking.date = _date;
        booking.extraInfo = _extraInfo;
        booking.venueName = _venueName;
        booking.bookingAgent = msg.sender;
    }

    // Agree to the Booking - initialised by the artist

    function agreement(uint _gigNumber) onlyOwner public {

        Booking storage booking = Bookings[_gigNumber];
        
        booking.agreed = true;
        booking.agreementTime = block.timestamp;
    }

    // Booking agent pays 50% of the payment as a deposit 
        
    function payBookingDeposit(uint _gigNumber) public payable {
        
        Booking storage booking = Bookings[_gigNumber];

        require(block.timestamp < (booking.agreementTime + 1 days)); // 24 hours to pay 
        require(msg.sender == booking.bookingAgent);
        require(msg.value == booking.payment / 5); // 20% of payment
        require(booking.agreed);

        booking.depositPaid = true;
        booking.currentState = State.bookingComplete;

        emit BookingFeePaid(true);    
    }

    // Booking agent confirms the performance was completed

    function confirmPerformance(uint _gigNumber) public {

        Booking storage booking = Bookings[_gigNumber];
        
        require(msg.sender == booking.bookingAgent);
        require(block.timestamp > booking.time);
        require(booking.depositPaid);
        require(booking.currentState == State.bookingComplete);

        booking.currentState = State.performanceCompleted; 
    }

    // Booking agent completes the remaining 50% of the payment once the performance is complete

    function finalisePayment(uint _gigNumber) public payable {
        
        Booking storage booking = Bookings[_gigNumber];

        require(booking.currentState == State.bookingComplete);
        require(msg.value == booking.payment /2);
    }

    // Withdraw funds - can only be called by the owner

    function withdraw() onlyOwner public {

        payable(owner).transfer(address(this).balance); 
    }


// View

    // Returns true if the performance time has passed 

    function isPerformanceComplete(uint _gigNumber) public view returns(bool){

        Booking storage booking = Bookings[_gigNumber];

        bool complete;
        block.timestamp > booking.time ? complete =  true : complete = false;

        return complete;
    }


    // Returns true if the deposit has been paid 

    function beenPaid(uint _gigNumber) public view returns(bool) {

        Booking storage booking = Bookings[_gigNumber];

        bool paid;
        booking.depositPaid == true ? paid = true : paid = false;
       
        return paid;

    } 
    

// Returns Contract balance

    function checkBalance() public view returns(uint) {
        return address(this).balance;
    }

}