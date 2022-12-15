const { expect } = require("chai");
const { ethers } = require("hardhat"); // ethers from hardhat library

// simulate the hardhat console to make sure it works from the begining

// converter
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether"); // returns value into a string
};

describe("Token", () => {
  //container for tests

  // declare instance
  let token; 
  let accounts; 
  let deployer;
  let reciever; 

  beforeEach(async () => {
    //Fetch token from blockchain
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("THE GREEK AND GLOVER","PETE THE GREEK","1000000");
    // get the first account on the list
    accounts = await ethers.getSigners();
    deployer = accounts[0]; // access first account
    reciever = accounts[1]; // reciever account
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

  describe('Sending Token', () => {
    let amount 
    it('Transfers Token balances', async () => {
      // log balance before transfer
      console.log('deployer balance before transfer', await token.balanceOf(deployer.address));
      console.log('reciever balance before transfer', await token.balanceOf(reciever.address));

      // Transfer the tokens
      amount = tokens(100);
      let transaction = await token.connect(deployer).transfer(reciever.address, amount); // connect wallet, account, amount
      let result = transaction.wait(); // checks that the trans action is going to the block

      // log balance after transfer
      console.log('deployer balance after transfer', await token.balanceOf(deployer.address));
      console.log('reciever balance after transfer', await token.balanceOf(reciever.address));

      // Ensures tokens were transfered
    })
  })
});
