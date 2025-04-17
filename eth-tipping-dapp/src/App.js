import React, { useEffect, useState } from "react";
import { parseEther, formatEther, JsonRpcProvider } from 'ethers';
import './App.css';

const App = () => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            const provider = new JsonRpcProvider("https://mainnet.infura.io/v3/be5c06cf97524bef8ec00e838a8363ac");
            const walletAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
            const balance = await provider.getBalance(walletAddress);
            setBalance(formatEther(balance));
        };

        fetchBalance();
    }, []);
    const sendTip = async () => {
        if (window.ethereum) {
            try {
                const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const transactionParams = {
                    from: account,
                    to: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', // Replace with your receiving wallet
                    value: parseEther("0.01").toHexString() // 0.01 ETH tip
                };

                await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParams]
                });

                alert('Thanks for your tip! 🚀');
            } catch (error) {
                console.error(error);
                alert('Transaction failed or cancelled.');
            }
        } else {
            alert('MetaMask not detected!');
        }
    };

    return (
        <div className="app">
            <h1 className="web3-heading">What is Web3?</h1>
            <p className="web3-description">
                Web3 is the future of the internet — open, decentralized, and owned by users.
                It uses blockchain to enable secure digital transactions and peer-to-peer interactions without middlemen.
            </p>

            <div className="card">
                <h2>TipJar3</h2>
                <p className="balance">{balance ? `Balance: ${balance} ETH` : "Loading..."}</p>

                <button className="tip-button" onClick={sendTip}>
                    💸 Send a Tip
                </button>


                <section className="info">
                    <h3>Decentralization of Trust</h3>
                    <p>
                        In TipJar3, tipping uses smart contracts. No middlemen, no admins — only transparent,
                        verifiable on-chain code defines the rules.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default App;
