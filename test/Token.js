const { expect } = require("chai");
const { ethers } = require("hardhat"); // ethers from hardhat library

// simulate the hardhat console to make sure it works from the begining

describe("Token", () => {
    //container for tests
    let token // declare instance

    beforeEach(async () =>{
        //Fetch token from blockchain
        const Token = await ethers.getContractFactory('Token');
        token = await Token.deploy();
    });

    it("Has a name", async () =>{
        //check that name is correct
        //Read token name
        const name = await token.name()
        //Check that token name is correct
        // leverage chai with expect function
        expect(name).to.equal('THE GREEK AND GLOVER')
        // console.log(name, ""); one option
    })
    it("Has correct symbol", async () =>{
        const Token = await ethers.getContractFactory('Token');
        let token = await Token.deploy();
        const symbol = await token.symbol();
        expect(symbol).to.equal('PETE THE GREEK');

    });
});
