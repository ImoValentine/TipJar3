import React, { useEffect, useState } from "react";
import { parseEther, formatEther, JsonRpcProvider } from "ethers";
import "./App.css";

const App = () => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            const provider = new JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");
            const walletAddress = "0xYourWalletAddress";
            const balance = await provider.getBalance(walletAddress);
            setBalance(formatEther(balance));
        };

        fetchBalance();
    }, []);

    const sendTip = async () => {
        if (!window.ethereum) {
            alert("MetaMask not detected. Please install MetaMask.");
            return;
        }
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const sender = accounts[0];
        const provider = new JsonRpcProvider(window.ethereum);
        const signer = provider.getSigner(sender);

        try {
            const tx = await signer.sendTransaction({
                to: "0xYourWalletAddress",
                value: parseEther("0.01")
            });
            await tx.wait();
            alert("Tip sent! Thank you for your support!");
        } catch (error) {
            console.error(error);
            alert("Transaction failed.");
        }
    };

    return (
        <div className="app-container">
            <h1 className="main-heading">TipJar3</h1>
            <h2 className="sub-heading">What is Web3?</h2>
            <p className="description">
                Web3 is the decentralized evolution of the internet — empowering users to control their data, identity, and money using blockchain technology. No middlemen, no central authority. Just direct, peer-to-peer digital freedom.
            </p>

            <h3>Decentralization of Trust</h3>
            <p>
                Smart contract rules live on-chain — no admin can reverse or block a tip. Peer-to-contract payments ensure your ETH goes straight to the recipient, visible and verifiable on the blockchain.
            </p>

            <h3>Why Donate?</h3>
            <p>
                Your tip helps us scale Web3 applications and bring decentralized solutions to more users worldwide.
                <br />
                💡 <strong>Optional Perk:</strong> Donors can choose to have their name proudly displayed as a supporter!
            </p>

            <button className="tip-button" onClick={sendTip}>💸 Send a Tip</button>

            <p className="balance-display">
                {balance ? `Total Received: ${balance} ETH` : "Loading total donations..."}
            </p>
        </div>
    );
};

export default App;
