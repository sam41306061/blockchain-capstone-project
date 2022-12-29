const { expect } = require("chai");
const { ethers } = require("hardhat"); // ethers from hardhat library

// simulate the hardhat console to make sure it works from the begining

// converter
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether"); // returns value into a string
};

describe('Exchange', () => {
  //container for tests
  // declare instance
  let deployer, feeAccount, exchange
  // always 10%
  const feePercent = 10;
  beforeEach( async () => {
    // get the first account on the list
    accounts = await ethers.getSigners();
    deployer = accounts[0]; // access first account
    feeAccount = accounts[1]; // reciever account
    //Fetch token from blockchain
    const Exchange = await ethers.getContractFactory('Exchange');
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
});
