const hre = require("hardhat");

async function main() {
    // your local node’s first account is the owner
    const [owner] = await hre.ethers.getSigners();

    // replace with your fresh address
    const contractAddress = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82";

    // get the factory & attach
    const EthTipping = await hre.ethers.getContractFactory("EthTipping");
    const tip = EthTipping.attach(contractAddress);

    // call withdraw()
    const tx = await tip.connect(owner).withdraw();
    await tx.wait();

    console.log(`✅ Withdraw complete! Tx Hash: ${tx.hash}`);
}

main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});
