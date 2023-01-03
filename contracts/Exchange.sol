//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
// local contracts
import "./Token.sol";

contract Exchange {
    address public feeAccount;
    uint256 public feePercent;
    mapping(address => mapping(address => uint256)) public tokens;
    //orders mapping
    mapping(uint256 => _Order);

    // order modeling
    struct _Order {
        // attributes of an order
        uint256 id; // Unique identifier
        address user; // user who made order
        address tokenGet; // address of the token the recieve
        uint256 amountGet; // how much they get 
        address tokenGive; // address of the token they give
        uint256 amountGive; // how much they gave
        uint256 timestamp; // time order was made
    }

    event Deposit(address token, address user, uint256 amount, uint256 balance);
    event Withdraw(
        address token,
        address user,
        uint256 amount,
        uint256 balance
    );

    constructor(address _feeAccount, uint256 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    // ------------------------
    // DEPOSIT & WITHDRAW TOKEN

    function depositToken(address _token, uint256 _amount) public {
        // Transfer tokens to exchange
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));

        // Update user balance
        tokens[_token][msg.sender] = tokens[_token][msg.sender] + _amount;

        // Emit an event
        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    function withdrawToken(address _token, uint256 _amount) public {
        // Transfer Tokens to user
        Token(_token).transfer(msg.sender, _amount);
        // Update balance
        tokens[_token][msg.sender] = tokens[_token][msg.sender] - _amount;
        // Emit an event
        emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    function balanceOf(address _token, address _user)
        public
        view
        returns (uint256)
    {
        return tokens[_token][_user];
    }

    // ------------------------
    // DEPOSIT & WITHDRAW TOKEN
     
    function makeOrder(
    address _tokenGet, 
    uint256 _amountGet, 
    address _tokenGive, 
    address _amountGive) public {
     //Token Give (the token they want to spend) - which taken, and how much?
    // token Get (the token they want to receive) - which taken, and how much?

        //  uint256 id; // Unique identifier
        //     address user; // user who made order
        //     address tokenGet; // address of the token the recieve
        //     uint256 amountGet; // how much they get 
        //     address tokenGive; // address of the token they give
        //     uint256 amountGive; // how much they gave
        //     uint256 timestamp; // time order was made
    _Order(
        1, // id
        msg.sender, // user
        _tokenGet,
        _amountGet,
        _tokenGive,
        _amountGive,
        _timestamp
    )
    }
}
