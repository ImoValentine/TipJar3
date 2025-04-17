const hre = require("hardhat");

async function main() {
    const address = "PASTE_YOUR_NEW_ADDRESS_HERE";
    const EthTipping = await hre.ethers.getContractFactory("EthTipping");
    const tip = await EthTipping.attach(address);
    console.log("Available functions:", tip.interface.fragments.map(f => f.name));
}

main().catch(e => { console.error(e); process.exitCode = 1; });
