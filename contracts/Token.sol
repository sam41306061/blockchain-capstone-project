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
    mapping(address => mapping(address => uint256)) public allowance; // nested mapping
    // transfer
    event Transfer(
        address indexed from, 
        address indexed to, 
        uint256 vaule
    ); // who, where, amount
    event Approval (
        address indexed owner,
        address indexed spender,
        uint256 value
    );

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
        returns (bool success) {
        // Require that sender has enough tokens to spend
        require(balanceOf[msg.sender] >= _value);
        _transfer(msg.sender,_to, _value);
        return true;
    }

    // internal function transfer
    function _transfer(address _from, address _to, uint256 _value) 
    internal {
        require(_to != address(0));
        // deudct tokens from spender
        balanceOf[_from] = balanceOf[_from] - _value;
        // credit tokens to reciever
        balanceOf[_to] = balanceOf[_to] + _value;
        // emit event
        emit Transfer(_from, _to, _value);
    }

    // transfer for the exchange
    function approve(address _spender, uint256 _value)
        public
        returns (bool success) {
        require(_spender != address(0));
        allowance[msg.sender][_spender] = _value; // access nested mapping for sender to get value
        
        emit Approval(msg.sender, _spender, _value); 
        return true;
    }

    // transfer from other account 
    function transferFrom(
        address _from, 
        address _to, 
        uint256 _value
    ) 
    public 
    returns (bool success) {
        require (_value <= balanceOf[_from], 'insufficient balance'); // make sure wallet has tokens to transfer
        require (_value <= allowance[_from][msg.sender], 'insufficient allowance'); // if true, keep going otherwise stop
        // reset the allowance
        allowance[_from][msg.sender] = allowance[_from][msg.sender] - _value; // if they spend the allowance, reset it
        // spend tokens
        _transfer(_from, _to, _value);

        return true;
    }
}
