// SPDX-License-Identifier: GPL-3.0

import "./ProofOfPayment.sol";
import "./PerformanceContract.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";


pragma solidity 0.8.17;

contract BookingEscrow {

    ERC20 DAI;
    ProofOfPayment proofOfPayment;

    enum PaymentState {
        NO_PAYMENT_MADE, 
        DEPOSIT_PAID, 
        PERFORMANCE_FINALISED_ARTIST,
        PERFORMANCE_FINALISED_AGENT,
        PERFORMANCE_FINALISED, 
        PAYMENT_FINALISED,
        PAYMENT_CONFIRMED, 
        COMPLETE
        }

    PaymentState public currentState;

    address public artist;
    string public artistName;
    address public bookingAgent;
    string public bookingAgentName;
    uint256 public gigNumber;
    uint256 public payment;

    bool public performanceConfirmedArtist;
    bool public performanceConfirmedAgent;

    mapping(uint => address) public gigNumberToBookingAgent;

    modifier onlyArtist(){
        require(msg.sender == artist);
        _;
    }

    modifier onlyBookingAgent(){
        require(msg.sender == bookingAgent);
        _;
    }
    
    
    constructor(
        address _artist,
        string memory _artistName,
        address _bookingAgent, 
        string memory _bookingAgentName,
        uint _gigNumber, 
        uint256 _payment,
        address _daiAddress
        ) payable {
        artist = _artist;
        artistName = _artistName;
        bookingAgent = _bookingAgent;
        bookingAgentName = _bookingAgentName;
        gigNumber = _gigNumber;
        payment = _payment;
        DAI = ERC20(_daiAddress);

        currentState = PaymentState.NO_PAYMENT_MADE;
        
    }

    function payDeposit() external {
        require(currentState == PaymentState.NO_PAYMENT_MADE);
        uint deposit = (payment*10**18) /5;
        bool success = DAI.transferFrom(msg.sender, address(this), deposit);
        require(success);

        currentState = PaymentState.DEPOSIT_PAID;

    }

    function confirmPerformance() external {
        require(currentState == PaymentState.DEPOSIT_PAID);
        if(msg.sender == artist) {
            performanceConfirmedArtist = true;
            currentState = PaymentState.PERFORMANCE_FINALISED_ARTIST;    
        }
        else if(msg.sender == bookingAgent) {
            performanceConfirmedAgent = true;
            currentState = PaymentState.PERFORMANCE_FINALISED_AGENT;
        }if(performanceConfirmedArtist && performanceConfirmedAgent){
            currentState = PaymentState.PERFORMANCE_FINALISED;
        }
    }

    function finalisePayment() external onlyBookingAgent {
        require(currentState == PaymentState.PERFORMANCE_FINALISED);
        // bool confirmed = performanceContract.confirmPerformance(gigNumber);
        bool success = DAI.transferFrom(msg.sender, address(this), payment * 4/5);
        // require(confirmed);
        require(success);

        currentState = PaymentState.PAYMENT_FINALISED;
    }

    function confirmPayment() external onlyArtist {
        require(currentState == PaymentState.PAYMENT_FINALISED);
        currentState = PaymentState.PAYMENT_CONFIRMED;
    }

    function completeBooking() external {
        require(currentState == PaymentState.PAYMENT_CONFIRMED);
        if(currentState == PaymentState.PAYMENT_CONFIRMED){
            selfdestruct(payable(artist));
        }
    }
}