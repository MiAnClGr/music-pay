// SPDX-License-Identifier: GPL-3.0

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

pragma solidity 0.8.17;

contract MockDai is ERC20("Dai Stablecoin", "DAI") {

    function mintDai(uint _amount) external {
        _mint(msg.sender, _amount);
    }

}