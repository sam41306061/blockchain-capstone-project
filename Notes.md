# Over all concepts and take aways
- solidty does not need semicolons after braces, it does however need them after declaring anything inside a function.

# Notes from the Smoke test video 
- 1 ether = 1000000000000000000 wei ( 18 zeros after the decimal).
- convert ether from wei out put in hard hat: ether.utils.formatEther()
<<<<<<< HEAD
- .exit is how you escape hardhat console 


# Notes from Testing Token Contract video
- Commands for video 
    - npx hardhat test: runs test files in project.

- Why do we write tests in JS?
    - It is easier to simulate user side events that contracts will experiance in the real world.
- if you want to call await inside a test function, the async keyword needs to be added to the top level.
    - ex:(**/ it("Has a name", async () =>{ /** **/ it("Has a name", async () =>{/**)
- Check ERC-20 docs when building out your contracts for compliance. 
- utilize beforeEach function if you need to duplicate mulitple steps in Testing: 25:50
    - once utilized, speed increase of 643ms when testing
- Decimals intiger will convert to a string when called

# Resoureses links from various videos for reference. 
• ERC-20 Standard: https://ethereum.org/en/developers/docs/standards/tokens/erc-20/

• Dai Token: https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f#code

• Hardhat config: https://hardhat.org/config/

• Hardhat scripts: https://hardhat.org/guides/scripts.html
    - testing scripts: https://hardhat.org/tutorial/testing-contracts.html

• Ethers Contract Factory: https://docs.ethers.io/v5/api/contract/contract-factory/

• Promises: https://javascript.info/promise-basics

• Eth Converter: https://eth-converter.com/

• Waffle Chai: https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
    - waffle docs: https://ethereum-waffle.readthedocs.io/en/latest/

• Chai Docs: https://www.chaijs.com/
