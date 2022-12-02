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
    token = await Token.deploy();
  });

  it("Has a name", async () => {
    //check that name is correct
    expect(await token.name()).to.equal("THE GREEK AND GLOVER");
  });
  it("Has correct symbol", async () => {
    // check that symbol is correct
    expect(await token.symbol()).to.equal("PETE THE GREEK");
  });
  it("Has correct decimal", async () => {
    // check that decimal is correct
    expect(await token.decimals()).to.equal("18");
  });

  it("Has correct total supply", async () => {
    // check that decimal is correct
    expect(await token.totalSupply()).to.equal(tokens('1000000'));
  });
});

// iteraton 1
    // it("Has correct total supply", async () =>{
    //     // check that decimal is correct
    //     expect(await token.totalSupply()).to.equal('1000000000000000000000000'); 
    // coverted 1,000,000 ether to wei https://eth-converter.com/
    // });
