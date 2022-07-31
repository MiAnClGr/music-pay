// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "./PerformanceContract.sol";
import "./ArtistFactory.sol";

contract ArtistProfile {

    string public artistName;
    address payable public artist;
    

    // PerformanceContract[] public performanceContractArray;
   
    modifier onlyArtist() {  
        require(msg.sender == artist);
        _;
    }

    constructor(string memory _artistName, address _artist) {
        artistName = _artistName;
        artist = payable(_artist);
        
        createPerformanceContract(artist);
    }

    receive() external payable {
    
    }

    function createPerformanceContract(address _artist) public {
        new PerformanceContract(_artist );
    }

    function withdraw() onlyArtist public {
        payable(artist).transfer(address(this).balance);
    }

    function deposit() public payable {
        
    }

    function balance() public view returns(uint) {
        return address(this).balance;
    }

  
}