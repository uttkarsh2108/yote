import { useState } from "react";
import OwnedPoll from "./OwnedPoll.jsx"
import CreatePoll from "./CreatePoll.jsx";
import "./Yourpolls.css"

function YourPolls(){
    const [showPopup, setShowPopup] = useState(false);

    function openPopup() {
        setShowPopup(true);
    }

    function closePopup() {
        setShowPopup(false);
    }


    return (
        <>
        <div className="create-poll-section">
            <button className="create-poll-button" onClick={openPopup}> Create Poll </button>
            <CreatePoll show={showPopup} onClose={closePopup}/>
        </div><hr/>
        <div className="your-added-polls pollList">
            <h1>Your Added Polls</h1>
            <OwnedPoll name="Poll1" pollStatus="added"/>
        </div><br/><hr/><br/>
        <div className="your-active-polls pollList">
            <h1>Your Active Polls</h1>
            <OwnedPoll name="Poll1" pollStatus="active"/>
        </div><br/><hr/><br/>
        <div className="your-closed-polls pollList">
            <h1>Your Closed Polls</h1>
            <OwnedPoll name="Poll1"/>
            <OwnedPoll name="Poll2"/>
        </div>
        </>
    );
}

export default YourPolls