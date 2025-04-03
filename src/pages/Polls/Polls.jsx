import Poll from "./Poll.jsx"
import "./Polls.css"

function Polls(){
    return (
        <>
        <div className="pollsList">
            <h1> Active Polls </h1><br/>
            <Poll name="one" pollStatus="active"/>
            <Poll name="two" pollStatus="active"/>
        </div><br/><hr/><br/>
        <div className="pollsList">
            <h1> Closed Polls </h1><br/>
            <Poll name="one" pollStatus="closed"/>
            <Poll name="two" pollStatus="closed"/>
            <Poll name="three" pollStatus="closed"/>
            <Poll name="four" pollStatus="closed"/>
            <Poll name="five" pollStatus="closed"/>
         </div></>
    );
}

export default Polls