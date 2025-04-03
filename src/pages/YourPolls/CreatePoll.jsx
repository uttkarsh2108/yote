

function CreatePoll(props){
    if (!props.show) {
        return null;
    }
    return(
        <div className="popup-overlay">
        <div className="popup-content">
            <div className="crpoll"><h2>Create a New Poll</h2></div>
            <form>
                <label>Poll Title:</label>
                <input type="text" placeholder="Enter Title" required />

                <label>Poll Description:</label>
                <input type="text" placeholder="Enter Description" required />

                <button type="submit">Create Poll</button>
                <button className="close-btn" onClick={props.onClose}>Cancel</button>
            </form>
        </div>
    </div>
    );
}

export default CreatePoll