const { expect } = require("chai");
const { ethers } = require("hardhat"); // ethers from hardhat library
const { result, before } = require("lodash");

// simulate the hardhat console to make sure it works from the begining

// converter
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether"); // returns value into a string
};

describe("Token", () => {
  //container for tests

  // declare instance
  let token, accounts, deployer, reciever;

  beforeEach(async () => {
    //Fetch token from blockchain
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy(
      "THE GREEK AND GLOVER",
      "PETE THE GREEK",
      "1000000"
    );
    // get the first account on the list
    accounts = await ethers.getSigners();
    deployer = accounts[0]; // access first account
    reciever = accounts[1]; // reciever account
    exchange = accounts[2];
  });

  describe("Deployment", () => {
    //settings for the contract
    const name = "THE GREEK AND GLOVER";
    const symbol = "PETE THE GREEK";
    const decimals = "18";
    const totalSupply = tokens("1000000");

    it("Has a name", async () => {
      //check that name is correct
      expect(await token.name()).to.equal(name);
    });
    it("Has correct symbol", async () => {
      // check that symbol is correct
      expect(await token.symbol()).to.equal(symbol);
    });
    it("Has correct decimal", async () => {
      // check that decimal is correct
      expect(await token.decimals()).to.equal(decimals);
    });

    it("Has correct total supply", async () => {
      // check that decimal is correct
      expect(await token.totalSupply()).to.equal(totalSupply);
    });
    it("Assigns total suply to deployer", async () => {
      // check that correct address is set to totalSupply
      console.log(deployer.address);
      expect(await token.balanceOf(deployer.address)).to.equal(totalSupply);
    });
  });

  describe("Sending Token", () => {
    let amount, transaction, result;

    describe("Success", () => {
      // success case testing
      beforeEach(async () => {
        // Transfer the tokens
        amount = tokens(100);
        transaction = await token
          .connect(deployer)
          .transfer(reciever.address, amount);
        result = await transaction.wait();
      });

      it("Transfers Token balances", async () => {
        // Ensures tokens were transfered
        expect(await token.balanceOf(deployer.address)).to.equal(
          tokens(999900)
        );
        expect(await token.balanceOf(reciever.address)).to.equal(amount);
      });

      it("Emits a Transfer event", async () => {
        const event = result.events[0];
        expect(event.event).to.equal("Transfer");

        const args = event.args;
        expect(args.from).to.equal(deployer.address); // who
        expect(args.to).to.equal(reciever.address); // where
        expect(args.value).to.equal(reciever.amount); // how much
      });
    });
    describe('Faliure', () =>{
      it('Rejects insufficient balances', async() =>{
        const invalidAmount = tokens(1000000000);
        await expect(token.connect(deployer).transfer(reciever.address, invalidAmount)).to.be.reverted; // uses the invalid amount for transfer
      });

      it('Recjects invalid recipent', async() => {
        const amount = tokens(100)
        await expect(token.connect(deployer).transfer('0x0001', amount)).to.be.reverted;
      });
    });
    describe('Approving tokens',() => {
      // re-using trasaction code to be used for testing exchange test
      let amount, transaction, result;
      beforeEach(async () =>{
        amount = tokens(100);
        transaction = await token.connect(deployer).approve(exchange.address, amount);
        result = await transaction.wait();
      });
      describe('Success', () => {
        it('Allocates an allowance for delegated token spending', async() =>{
          expect(await token.allowance(deployer.address, exchange.address)).to.equal(amount) // owner and spender.address
        });
        it("Emits a Approval event", async () => {
          const event = result.events[0];
          expect(event.event).to.equal("Approval");
  
          const args = event.args;
          expect(args.owner).to.equal(deployer.address); // who
          expect(args.spender).to.equal(exchange.address); // where
          expect(args.value).to.equal(amount); // how much
        });
      });
      describe('Failure', ()=>{

      });
    });
  });
});
