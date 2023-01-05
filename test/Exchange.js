const { expect } = require("chai");
const { ethers } = require("hardhat"); // ethers from hardhat library
const { transform } = require("lodash");

// simulate the hardhat console to make sure it works from the begining

// converter
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether"); // returns value into a string
};

describe("Exchange", () => {
  //container for tests
  // declare instance
  let deployer, feeAccount, exchange;
  // always 10%
  const feePercent = 10;
  beforeEach(async () => {
    //Fetch token from blockchain
    const Exchange = await ethers.getContractFactory("Exchange");
    const Token = await ethers.getContractFactory("Token");

    token1 = await Token.deploy(
      'THE GREEK AND GLOVER',
      'PETE THE GREEK',
      '1000000'
    );
    token2 = await Token.deploy(
      'Mock Dai',
      'mDAI',
      '1000000'
    );

    // get the first account on the list
    accounts = await ethers.getSigners();
    deployer = accounts[0]; // access first account
    feeAccount = accounts[1]; // reciever account
    user1 = accounts[2];
    // deploy on exchange
    let transaction = await token1
      .connect(deployer)
      .transfer(user1.address, tokens(100));
    await transaction.wait();
    exchange = await Exchange.deploy(feeAccount.address, feePercent);
  });

  describe("Deployment", () => {
    it("tracks the fee account", async () => {
      //check that name is correct
      expect(await exchange.feeAccount()).to.equal(feeAccount.address);
    });
    it("tracks the fee percent", async () => {
      //check that name is correct
      expect(await exchange.feePercent()).to.equal(feePercent);
    });
  });
  describe("Depositing Tokens", () => {
    let transaction, result;
    let amount = tokens(10);
    describe("Success", () => {
      beforeEach(async () => {
        // approve token
        transaction = await token1
          .connect(user1)
          .approve(exchange.address, amount);
        result = await transaction.wait();
        // deposit token
        transaction = await exchange
          .connect(user1)
          .depositToken(token1.address, amount);
        result = await transaction.wait();
      });
      it("tracks the token deposit", async () => {
        expect(await token1.balanceOf(exchange.address)).to.equal(amount);
        expect(await exchange.tokens(token1.address, user1.address)).to.equal(
          amount
        );
        expect(
          await exchange.balanceOf(token1.address, user1.address)
        ).to.equal(amount);
      });
      it("emits a deposit event", async () => {
        const event = result.events[1]; // 2 events are emitted
        expect(event.event).to.equal("Deposit");

        const args = event.args;
        expect(args.token).to.equal(token1.address); // who
        expect(args.user).to.equal(user1.address); // where
        expect(args.amount).to.equal(amount); // how much
        expect(args.balance).to.equal(amount); // remainig
      });
    });
    describe("Failure", () => {
      it("fails when no tokens are approved", async () => {
        await expect(exchange.connect(user1).depositToken(token1.address)).to.be
          .reverted; // dont approve tokens before depositing
      });
    });
  });
  describe("Withdrawing Tokens", () => {
    let transaction, result;
    let amount = tokens(10);
    describe("Success", () => {
      beforeEach(async () => {
        //Depositing Tokens before withdrawing
        // approve token
        transaction = await token1
          .connect(user1)
          .approve(exchange.address, amount);
        result = await transaction.wait();
        // deposit token
        transaction = await exchange
          .connect(user1)
          .depositToken(token1.address, amount);
        result = await transaction.wait();
        // Now withdrawing tokens
        transaction = await exchange
          .connect(user1)
          .withdrawToken(token1.address, amount);
        result = await transaction.wait();
      });
      it("withdraws token funds", async () => {
        expect(await token1.balanceOf(exchange.address)).to.equal(0);
        expect(await exchange.tokens(token1.address, user1.address)).to.equal(
          0
        );
        expect(
          await exchange.balanceOf(token1.address, user1.address)
        ).to.equal(0);
      });
      it("emits a withdraw  event", async () => {
        const event = result.events[1]; // 2 events are emitted
        expect(event.event).to.equal("Withdraw");

        const args = event.args;
        expect(args.token).to.equal(token1.address); // who
        expect(args.user).to.equal(user1.address); // where
        expect(args.amount).to.equal(amount); // how much
        expect(args.balance).to.equal(0); // remainig
      });
    });
    describe("Failure", () => {
      it("fails when no tokens are approved", async () => {
        await expect(exchange.connect(user1).withdrawToken(token1.address)).to
          .be.reverted; // dont approve tokens before depositing
      });
    });
  });
  describe("Checking Balances", () => {
    let transaction, result;
    let amount = tokens(1);
    beforeEach(async () => {
      //Approve Token
      transaction = await token1
        .connect(user1)
        .approve(exchange.address, amount);
      result = await transaction.wait();
      //Deposit Token
      transaction = await exchange
        .connect(user1)
        .depositToken(token1.address, amount);
      result = await transaction.wait();
    });
    it("returns user balance", async () => {
      expect(await exchange.balanceOf(token1.address, user1.address)).to.equal(
        amount
      );
    });
  });
  describe("Making Orders", () => {
    let transaction, result;
    let amount = tokens(1);
    describe("Success", async () => {
      beforeEach(async () => {
        //Depositing Tokens before making orders
        // approve token
        transaction = await token1.connect(user1).approve(exchange.address, amount);
        result = await transaction.wait();
        // deposit tokens
        transaction = await exchange.connect(user1).depositToken(exchange.address, amount);
        result = await transaction.wait();
        // make the order
        transaction = await exchange.connect(user1).makeOrder(token2.address, amount, token1.address, amount);
        result = await transaction.wait(); // one to one transfer
      });
      it("tracks a newley created order", async () => {
        //expect(await exchange.orderCount()).to.equal(1)
      });
      describe("Failure", async () => {
        // it('Rejects with no balance', async () => {
        //   await expect(exchange.connect(user1).makeOrder(token2.address, tokens(1), token1.address, tokens(1))).to.be.reverted
        // })
      });
    });
  });
});
