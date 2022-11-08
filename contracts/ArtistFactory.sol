// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

import "./ArtistProfile.sol";

contract ArtistFactory {

    mapping(string => address) public artistByName;
    mapping(address => string) public artistByAddress;
    mapping(address => address) public artistProfileToArtist;
    mapping(string => bool) public doesArtistExist;

    address[] public Artists;

    event NewArtist(address);

    function createArtist(string memory _artistName) external {
    
        require(!doesArtistExist[_artistName], "Artist already Exists");
        
        ArtistProfile artistProfile = new ArtistProfile(_artistName, msg.sender);
        artistByName[_artistName] = address(artistProfile);
        artistByAddress[address(artistProfile)] = _artistName;
        artistProfileToArtist[address(artistProfile)] = msg.sender;
        doesArtistExist[_artistName] = true;
        Artists.push(address(artistProfile));
        
        emit NewArtist(address(artistProfile));
    }
}