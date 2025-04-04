import CreatedCandidate from "./CreatedCandidate";
import AddCandidate from "./AddCandidate";
import {useState} from "react"
import "./OwnedPoll.css";

function OwnedPoll({ pollStatus, name }) {
    const canVote = pollStatus === "active";
    const showAddButton = pollStatus === "added";

    const [showPopup, setShowPopup] = useState(false);
    
        function openPopup() {
            setShowPopup(true);
        }
    
        function closePopup() {
            setShowPopup(false);
        }    

    return (
        <div className="poll">
            <h6 className="poll-status">{pollStatus}</h6>
            <h2 className="poll-title">{name}</h2>
            <p className="poll-description">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi sit sed
                deleniti maxime distinctio mollitia delectus fugiat necessitatibus est deserunt
                molestiae laudantium, accusantium repellat, sunt qui unde totam praesentium id?
            </p>
            <br />
            <div className="candidates">
                <h4>Candidates:</h4>
                <CreatedCandidate cid={1} name="one" desc="one" votes={102} canVote={canVote} />
                <CreatedCandidate cid={2} name="two" desc="two" votes={150} canVote={canVote} />
            </div>
            {showAddButton && <button className="add-candidate-btn" onClick={openPopup}>Add Candidate</button>}
            <AddCandidate show={showPopup} onClose={closePopup}/>
        </div>
    );
}

export default OwnedPoll;