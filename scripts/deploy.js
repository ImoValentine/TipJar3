const hre = require("hardhat");

async function main() {
    // Get the Contract Factory
    const EthTipping = await hre.ethers.getContractFactory("EthTipping");

    // Deploy the contract
    const ethTipping = await EthTipping.deploy();

    // Wait until the contract is deployed
    await ethTipping.waitForDeployment();

    // Log the contract address
    console.log(`EthTipping Contract deployed to: ${ethTipping.target}`);
}

// Run the script and handle errors
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
