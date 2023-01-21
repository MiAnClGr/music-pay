// SPDX-License-Identifier: GPL-3.0

import "./ProofOfPayment.sol";
import "./ArtistFactory.sol";
import "./ArtistProfile.sol";
import "./PerformanceContract.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";


pragma solidity 0.8.17;

contract BookingEscrow {

    ERC20 DAI;
    ArtistFactory artistFactory;
    ProofOfPayment proofOfPayment;
    ArtistProfile profile;

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
    address public artistProfile;
    string public artistName;
    address public bookingAgent;
    string public bookingAgentName;
    uint256 public gigNumber;
    uint256 public payment;
    uint256 public time;
    string public venueName;
    string public date;

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
        uint _time,
        string memory _venueName,
        string memory _date,
        address _daiAddress,
        address _artistFactoryAddress
        ) payable {
        artist = _artist;
        artistProfile = msg.sender;
        artistName = _artistName;
        bookingAgent = _bookingAgent;
        bookingAgentName = _bookingAgentName;
        gigNumber = _gigNumber;
        payment = _payment;
        time = _time;
        venueName = _venueName;
        date = _date;
        DAI = ERC20(_daiAddress);
        artistFactory = ArtistFactory(_artistFactoryAddress);
        profile = ArtistProfile(payable(msg.sender));
        artistFactory.addEscrowAgent(_bookingAgent);
        artistFactory.addEscrowArtist(msg.sender);
        currentState = PaymentState.NO_PAYMENT_MADE;
        
    }

///External

    function payDeposit() external {
        require(currentState == PaymentState.NO_PAYMENT_MADE);
        uint deposit = (payment*10**18) /5;
        bool success = DAI.transferFrom(msg.sender, address(this), deposit);
        require(success);

        currentState = PaymentState.DEPOSIT_PAID;

    }

    function confirmPerformanceArtist() external {
        if(msg.sender == artist && currentState == PaymentState.DEPOSIT_PAID) {
            performanceConfirmedArtist = true;
            currentState = PaymentState.PERFORMANCE_FINALISED_ARTIST;    
        }
    }

    function confirmPerformanceAgent() external {
        if(msg.sender == bookingAgent && currentState == PaymentState.PERFORMANCE_FINALISED_ARTIST) {
            performanceConfirmedAgent = true;
            currentState = PaymentState.PERFORMANCE_FINALISED_AGENT;
        } 
        finalisePerformance();
    }


    function finalisePayment() external onlyBookingAgent {
        require(currentState == PaymentState.PERFORMANCE_FINALISED);
        uint _payment = (payment*10**18);
        bool success = DAI.transferFrom(msg.sender, address(this), _payment * 4/5);
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
            profile.completeBooking(gigNumber);
            DAI.transfer(artistProfile, DAI.balanceOf(address(this)));
        }
    }

///Internal

    function finalisePerformance() internal {
        if(performanceConfirmedArtist && performanceConfirmedAgent){
            currentState = PaymentState.PERFORMANCE_FINALISED;
        }
    }

///View    

    function getBalance() external view returns(uint) {
        return DAI.balanceOf(address(this))/10**18;
    }
}