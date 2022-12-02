const { expect } = require("chai");
const { ethers } = require("hardhat"); // ethers from hardhat library

// simulate the hardhat console to make sure it works from the begining

// converter
const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether'); // returns value into a string
}

describe("Token", () => {
  //container for tests
  let token; // declare instance

  beforeEach(async () => {
    //Fetch token from blockchain
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy('THE GREEK AND GLOVER', 'PETE THE GREEK', '1000000');
  });


describe('Deployment', () => {
    //settings for the contract
    const name = 'THE GREEK AND GLOVER';
    const symbol = 'PETE THE GREEK';
    const decimals = '18'
    const totalSupply = '1000000';

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
        expect(await token.totalSupply()).to.equal(tokens(totalSupply));
      });
});

});
