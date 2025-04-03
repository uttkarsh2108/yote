 function CandidateInfo(props){

    return(
        <div className="candidate-info-box">
            <h6> {props.cid}</h6>
            <h4> {props.name}</h4>
            <p> {props.desc}</p>
            <h5> {props.votes}</h5>
            <button className="vote-btn"> Vote </button>
        </div>
    );
 }

 export default CandidateInfo