import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import "./Navbar.css";
import { FaHome, FaUserCircle, FaPoll } from "react-icons/fa";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

function Navbar() {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]); // Update wallet address
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        } catch (error) {
          console.error("Error fetching wallet:", error);
        }
      }
    };

    checkWalletConnection();

    // Listen for account changes
    window.ethereum?.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
      } else {
        setWalletAddress(""); // Reset when wallet is disconnected
      }
    });

  }, []);

  return (
    <div className="Navbar">
      <Logo />
      <ul className="nav-links">
        <li>
          <Link to="/">
            <FaHome className="icon" /> <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/polls">
            <FaPoll className="icon" /> <span>Polls</span>
          </Link>
        </li>
        <li>
          <Link to="/yourpolls">
            <FaUserCircle className="icon" /> <span>Your Polls</span>
          </Link>
        </li>
      </ul>
      <button className="connect-wallet" onClick={connectWallet}>
        {walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
      </button>
    </div>
  );
}

export default Navbar;