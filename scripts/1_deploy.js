const { ethers } = require("hardhat");

async function main() {
  console.log(`Preparing deployment..... \n`) // test to insure that deployment is kicked off
//script to manage token 
    //fetch contract to deploy
    const Token = await ethers.getContractFactory('Token');
    const Exchange = await ethers.getContractFactory('Exchange');
    
  const accounts = await ethers.getSigners() // deploy with fee account

  console.log(`Accounts fetched:\n${accounts[0].address}\n${accounts[1].address}`)

    // deploy contracts
    const DApp = await Token.deploy('THE GREEK AND GLOVER', 'PETE THE GREEK', '1000000');
    await DApp.deployed();
    console.log(`PETE THE GREEK Deployed to: ${DApp.address}`); //DApp coin

    const mETH = await Token.deploy('mETH', 'mETH', '1000000');
    await mETH.deployed();
    console.log(`mETH Deployed to: ${mETH.address}`); //meth coin

    const mDAI = await Token.deploy('mDAI', 'mDAI', '1000000');
    await mDAI.deployed();
    console.log(`mDAI Deployed to: ${mDAI.address}`); //dai coin

    const exchange = await Exchange.deploy(accounts[1].address, 10)
    await exchange.deployed()
    console.log(`Exchange Deployed to: ${exchange.address}`) // DApp exchange 

}
// boiler plate execute code
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
