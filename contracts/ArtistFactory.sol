// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "./ArtistProfile.sol";

contract ArtistFactory {

    mapping(string => address) public ArtistbyName;
    mapping(address => string) public ArtistbyAddress;
    //uint artistNumber = 1;
    mapping(string => bool) public doesArtistExist;

    ArtistProfile[] public ArtistArray;


    
    function createArtist(string memory _artistName) public {
      
        require(doesArtistExist[_artistName] == false, "Artist already Exists");
        
        ArtistProfile artistProfile = new ArtistProfile(_artistName, msg.sender);
        ArtistbyName[_artistName] = address(artistProfile);
        ArtistbyAddress[address(artistProfile)] = _artistName;
        doesArtistExist[_artistName] = true;
        ArtistArray.push(artistProfile);

    }



    function findArtistbyAddress(address _artist) public view returns(string memory) { 
        return ArtistbyAddress[_artist];

    }

    function findArtistbyName(string memory _name) public view returns(address) {
        return ArtistbyName[_name];
    }



}