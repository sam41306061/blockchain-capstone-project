//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name = "THE GREEK AND GLOVER";
    string public symbol = "PETE THE GREEK";
    uint256 public decimals = 18; 
    uint256 public totalSupply = 1000000 * (10**decimals); // 1,000,000 X 10^18
}
