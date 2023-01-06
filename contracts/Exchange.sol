//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";

contract Exchange {
    address public feeAccount;
    uint256 public feePercent;
    mapping(address => mapping(address => uint256)) public tokens;
    mapping(uint256 => _Order) public orders;
    uint256 public orderCount;
    mapping(uint256 => bool) public orderCancelled; // keeps the order on chain forever

    event Deposit(
        address token,
        address user,
        uint256 amount,
        uint256 balance
    );
    event Withdraw(
        address token,
        address user,
        uint256 amount,
        uint256 balance
    );
    event Order(
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive,
        uint256 amountGive,
        uint256 timestamp
    );
    event Cancel(
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive,
        uint256 amountGive,
        uint256 timestamp
    );

    struct _Order {
        // Attributes of an order
        uint256 id; // Unique identifier for order
        address user; // User who made order
        address tokenGet; // Address of the token they receive
        uint256 amountGet; // Amount they receive
        address tokenGive; // Address of token they give
        uint256 amountGive; // Amount they give
        uint256 timestamp; // When order was created
    }

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
        // Ensure user has enough tokens to withdraw
        require(tokens[_token][msg.sender] >= _amount);

        // Transfer tokens to user
        Token(_token).transfer(msg.sender, _amount);

        // Update user balance
        tokens[_token][msg.sender] = tokens[_token][msg.sender] - _amount;

        // Emit event
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
    // MAKE & CANCEL ORDERS
    function makeOrder(
        address _tokenGet,
        uint256 _amountGet,
        address _tokenGive,
        uint256 _amountGive
    ) public {
        // Prevent orders if tokens aren't on exchange
        require(balanceOf(_tokenGive, msg.sender) >= _amountGive);

        // Instantiate a new order
        orderCount = orderCount + 1;
        orders[orderCount] = _Order(
            orderCount,
            msg.sender,
            _tokenGet,
            _amountGet,
            _tokenGive,
            _amountGive,
            block.timestamp
        );

        // Emit event
        emit Order(
            orderCount,
            msg.sender,
            _tokenGet,
            _amountGet,
            _tokenGive,
            _amountGive,
            block.timestamp
        );
    }
    function cancelOrder(uint256 _id) public {
        // fetch the order
        _Order storage _order = orders[_id]; // pulling the order out from memory

        // ensure the caller of the function is the owner of the order
        require(address(_order.user) == msg.sender); // make sure its  the same person
        
        //order mus exist
        require(_order.id == _id);

        // cancel the order
        orderCancelled[_id] = true;

        // emit the event
        emit Cancel(
            orderCount,
            msg.sender,
            _order.tokenGet,
            _order.amountGet,
            _order.tokenGive,
            _order.amountGive,
            block.timestamp
        );
    }

    // ------------------------
    // EXECUTING ORDERS

    function fillOrder(uint256 _id) public {
        // fetch order
        _Order storage _order = orders[_id];
        // swapping tokens 

    }
    function _trade(
        uint256 _orderId,
        address _user, 
        address _tokenGet,
        uint256 _amountGet,
        address _tokenGive,
        uint256 _amountGive
        )
        internal {
             // fee structure
             uint256 _feeAmount = (_amountGet * feePercent) / 100; // 10% transaction fee

            // Do trade here ...
            // msg.sender is the user who filled the order, while _user is who created the order
            tokens[_tokenGet][msg.sender] = tokens[_tokenGet][msg.sender] -(_amountGet + _feeAmount); // user2
            tokens[_tokenGet][_user] = tokens[_tokenGet][_user] + _amountGet;  // order user
            
            // charge fees
            tokens[_tokenGet][feeAccount] = tokens[_tokenGet][feeAccount] + _feeAmount;

            // inverse of prodcedure above
            tokens[_tokenGive][_user] = tokens[_tokenGive][_user] - _amountGive;
            tokens[_tokenGive][msg.sender] = tokens[_tokenGive][msg.sender] + _amountGive;

           

    }
}
