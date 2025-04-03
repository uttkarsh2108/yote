import { Link } from "react-router-dom";
import Logo from "./Logo.jsx"
import "./Navbar.css"
import { FaHome, FaUserCircle, FaPoll } from "react-icons/fa"; // Import icons

function Navbar(){
    return(
        <div className="Navbar">
            <Logo/>
            <ul className="nav-links">
                <li><Link to="/"><FaHome className="icon" /> <span>Home</span></Link></li>
                <li><Link to="/polls"><FaPoll className="icon" /> <span>Polls</span></Link></li>
                <li><Link to="/yourpolls"><FaUserCircle className="icon" /> <span>Your Polls</span></Link></li>
            </ul>
            <button className="connect-wallet">Connect Wallet</button>
        </div>
    );
}

export default Navbar