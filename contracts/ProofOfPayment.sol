// SPDX-License-Identifier: GPL-3.0

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import "@openzeppelin/contracts/utils/Base64.sol";

pragma solidity 0.8.17;

contract ProofOfPayment is ERC721 {

    address owner;
   
    mapping(uint => string) public tokenIdToTokenURI;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol){
        owner = msg.sender;
    }

    function mintProofOfPayment(
        address _to, 
        uint _tokenId,
        string memory _artistName,
        string memory _payment,
        string memory _date,
        string memory _venueName
        ) public {
        require(msg.sender == owner);
        _mint(_to, _tokenId);
        string memory tokenURI = createTokenURI(_artistName, _payment, _date, _venueName);
        tokenIdToTokenURI[_tokenId] = tokenURI;

    }

    function createTokenURI(string memory name, string memory payment, string memory date, string memory venueName) internal pure returns (string memory){
       
        bytes memory dataURI = abi.encodePacked(
           '{',
                'name: ', name, "," ' '
                'payment: ', "$", payment, "," ' '
                'date: ', date, "," ' '
                'venue: ', venueName,  
            '}'
        );
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }
}