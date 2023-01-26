// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;
import "./ArtistProfile.sol";
import "./BookingEscrow.sol";

contract ArtistFactory {

    address daiAddress;

    mapping(address => address[]) public agentToCurrentEscrow;
    mapping(address => address[]) public artistToCurrentEscrow;

    mapping(address => address) public ownerToArtist;
    mapping(string => address) public artistNameToAddress;
    mapping(address => string) public artistAddressToName;
    mapping(address => address) public artistProfileToArtist;
    mapping(string => bool) public doesArtistExist;

    mapping(address => uint) public ratingArtistUp;
    mapping(address => uint) public ratingArtistDown;
    mapping(address => uint) public ratingAgentUp;
    mapping(address => uint) public ratingAgentDown;

    address[] public Artists;

    event Artist(address, string);

    constructor(address _daiAddress){
        daiAddress = _daiAddress;
    }

///External

    function createArtist(string memory _artistName) external {
    
        ArtistProfile artistProfile = new ArtistProfile(_artistName, msg.sender, daiAddress);
        ownerToArtist[msg.sender] = address(artistProfile);
        artistNameToAddress[_artistName] = address(artistProfile);
        artistAddressToName[address(artistProfile)] = _artistName;
        artistProfileToArtist[address(artistProfile)] = msg.sender;
        doesArtistExist[_artistName] = true;
        Artists.push(address(artistProfile));     

        emit Artist(address(artistProfile), "new artist");
    }

    function removeArtist(string memory _artistName) external {
        require(artistProfileToArtist[artistNameToAddress[_artistName]] == msg.sender);
        doesArtistExist[_artistName] = false;
    }

    function addEscrowAgent(address _bookingAgent) external {
        agentToCurrentEscrow[_bookingAgent].push(msg.sender);
    }

    function addEscrowArtist(address _artist) external {
        artistToCurrentEscrow[_artist].push(msg.sender);
    }

    function ratingArtist(uint _rating, address _artist) external {
        BookingEscrow bookingEscrow;
        bookingEscrow = BookingEscrow(msg.sender);
        require(_artist == bookingEscrow.artistProfile());
        if(_rating == 0){
            ratingArtistUp[_artist] ++;
        }else if(_rating == 1){
            ratingArtistDown[_artist] ++;
        }  
    }

    function ratingAgent(uint _rating, address _agent) external {
        BookingEscrow bookingEscrow;
        bookingEscrow = BookingEscrow(msg.sender);
        require(_agent == bookingEscrow.bookingAgent());
        if(_rating == 0){
            ratingAgentUp[_agent] ++;
        }else if(_rating == 1){
            ratingAgentDown[_agent] ++;
        }  
    }

///View

    function getEscrow(address _bookingAgent, uint _index) external view returns(address){
        return agentToCurrentEscrow[_bookingAgent][_index];
    }

    function getEscrowArrayLength(address _bookingAgent) external view returns(uint) {
        return (agentToCurrentEscrow[_bookingAgent].length - 1);
    }
}