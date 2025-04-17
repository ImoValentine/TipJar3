const hre = require("hardhat");

async function main() {
    const [tipper] = await hre.ethers.getSigners();

    // Contract address from your deployment output
    const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

    // Attach to the deployed contract
    const EthTipping = await hre.ethers.getContractFactory("EthTipping");
    const ethTipping = await EthTipping.attach(contractAddress);

    // Send 0.01 ETH as a tip
    const tx = await tipper.sendTransaction({
        to: contractAddress,
        value: hre.ethers.parseEther("0.01")
    });

    await tx.wait();

    console.log(`💸 Tip sent! Hash: ${tx.hash}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
