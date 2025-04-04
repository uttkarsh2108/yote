import CandidateInfo from "./CandidateInfo";
import "./Poll.css"
function Poll({ pollStatus, name }){
    const canVote = pollStatus === "active";
    const showAddButton = pollStatus === "added";

    return (
        <div className="poll">
            <h6 className="poll-status"> {pollStatus}</h6>
            <h2 className="poll-title">{name} </h2> 
            <p className="poll-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi sit sed deleniti maxime distinctio mollitia delectus fugiat necessitatibus est deserunt molestiae laudantium, accusantium repellat, sunt qui unde totam praesentium id?</p><br/>
            <div className="candidates"><h4>Candidates:</h4>
                <CandidateInfo cid={1} name="one" desc="one" votes={102} canVote={canVote}/>
                <CandidateInfo cid={1} name="one" desc="one" votes={102} canVote={canVote}/>
            </div>
        </div>
    );
}

export default Poll