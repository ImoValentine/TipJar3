import React, { useState } from 'react';
import './App.css';
import ParticleBackground from './ParticleBackground';
import emailjs from 'emailjs-com';

const App = () => {
    const [tipAmount] = useState('0x2386F26FC10000'); // 0.001 ETH in hex

    const sendTip = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                const transactionParameters = {
                    to: '0x1234567890abcdef1234567890abcdef12345678',
                    from: accounts[0],
                    value: tipAmount,
                };

                await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                });

                alert('Tip sent! Thank you for supporting Web3.');
            } catch (error) {
                console.error('Transaction failed:', error);
                alert(`Transaction failed: ${error.message || error}`);
            }
        } else {
            alert('MetaMask not detected. Please install MetaMask to send a tip.');
        }
    };

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(
            'service_vrsdj2a',
            'template_x235h8s',
            e.target,
            'joPLdN-MjMdc7-oEH'
        )
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div className="app-container">
            <div className="particles-wrapper">
                <ParticleBackground />
            </div>

            {/* 🔁 Marquee at top */}
            <div className="marquee-wrapper">
                <div className="marquee-track">
                    <div className="marquee-content">
                        Code is Law, and It’s Public • Decisions by Code, Not by Council • Immutable by Design •
                        Self-Enforcing, Self-Sovereign • Trust the Code, Not the Corporation • Censorship-Proof,
                        Tamper-Resistant •
                    </div>
                    <div className="marquee-content">
                        Code is Law, and It’s Public • Decisions by Code, Not by Council • Immutable by Design •
                        Self-Enforcing, Self-Sovereign • Trust the Code, Not the Corporation • Censorship-Proof,
                        Tamper-Resistant •
                    </div>
                </div>
            </div>

            <div className="content-wrapper">
                {/* Main Heading */}
                <h1 className="main-heading">TipJar3</h1>

                {/* Subheading */}
                <h2 className="sub-heading">What is Web3?</h2>
                <p className="description web3-description">
                    Web3 is the future of the internet — open, decentralized, and owned by users. It uses
                    blockchain to enable secure digital transactions and peer-to-peer interactions without
                    middlemen.
                </p>

                {/* 3-Column Layout */}
                <div className="card-grid">
                    {/* Column 1: DeFi */}
                    <div className="card-section">
                        <h3 className="card-title">What is DeFi?</h3>
                        <p className="description">
                            DeFi (Decentralized Finance) replaces banks with smart contracts and protocols on the
                            blockchain. No intermediaries. No permission needed. Just you, code, and the internet.DeFi is specifically about financial services on the blockchain.
                            Web3 is the bigger ecosystem, including DeFi plus non-financial applications like art (NFTs), social platforms, or governance systems.
                        </p>
                    </div>

                    {/* Column 2: Tip Box */}
                    <div className="card-section center-section">
                        <h3 className="card-title">TipJar3</h3>
                        <p className="balance-display">Balance: 0.001132159922225661 ETH</p>
                        <button className="tip-button" onClick={sendTip}>💸 Send a Tip</button>

                        <h3>Decentralization of Trust</h3>
                        <p className="description">
                            Smart contracts live on-chain — no admin can reverse or block your tip. Peer-to-contract payments
                            go straight to the recipient, verifiable on the blockchain.
                        </p>

                        <h3>Why Donate?</h3>
                        <p className="description">
                            Your tip helps us scale Web3 tools and sponsor innovative devs worldwide.
                        </p>
                    </div>

                    {/* Column 3: Email Form */}
                    <div className="card-section">
                        <h3 className="card-title">📩 Collaborate with TipJar3</h3>
                        <form onSubmit={sendEmail}>
                            <input type="email" name="user_email" placeholder="Your Email" required className="form-input" />
                            <textarea name="message" placeholder="Tell us about your project..." required className="form-textarea" />
                            <button type="submit" className="tip-button">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                Web3 app created by <strong>Jacobs Dynamic Development</strong>
            </footer>
        </div>
    );
};

export default App;
