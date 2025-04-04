function AddCandidate(props){
    if (!props.show) {
        return null;
    }
    return(
        <div className="popup-overlay">
        <div className="popup-content">
            <div className="crpoll"><h2>Add a New Candidate</h2></div>
            <form>
                <label>Candidate Name:</label>
                <input type="text" placeholder="Enter Name" required />

                <label>Candidate Description</label>
                <input type="text" placeholder="Enter Description" required />

                <button type="submit">Add Candidate</button>
                <button className="close-btn" onClick={props.onClose}>Cancel</button>
            </form>
        </div>
    </div>
    );
}

export default AddCandidate