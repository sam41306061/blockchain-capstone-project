//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name;
    string public symbol;
    uint256 public decimals = 18;
    uint256 public totalSupply;

    // Track balances
    mapping(address => uint256) public balanceOf;
    // transfer
    event Transfer(address indexed from, address indexed to, uint256 vaule); // who, where, amount

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply
    ) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * (10**decimals); // 1,000,000 X 10^18
        balanceOf[msg.sender] = totalSupply; // state varaible, write to the mapping
    }

    // transfer
    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        // Require that sender has enough tokens to spend 
        require(balanceOf[msg.sender] >= _value);
        // deudct tokens from spender
        balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
        // credit tokens to reciever
        balanceOf[_to] = balanceOf[_to] + _value;
        // emit event
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}
