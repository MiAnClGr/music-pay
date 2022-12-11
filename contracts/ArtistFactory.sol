// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;
import "./ArtistProfile.sol";

contract ArtistFactory {

    mapping(address => address) public ownerToArtist;
    mapping(string => address) public artistNameToAddress;
    mapping(address => string) public artistAddressToName;
    mapping(address => address) public artistProfileToArtist;
    mapping(string => bool) public doesArtistExist;

    address[] public Artists;

    event Artist(address, string);

    function createArtist(string memory _artistName) external {
    
        ArtistProfile artistProfile = new ArtistProfile(_artistName, msg.sender);
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
}