import "./Poll.css"
function Poll(props){
    return (
        <div className="poll">
            <h6 className="poll-status"> {props.pollStatus}</h6>
            <h2 className="poll-title">{props.name} </h2> 
            <p className="poll-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi sit sed deleniti maxime distinctio mollitia delectus fugiat necessitatibus est deserunt molestiae laudantium, accusantium repellat, sunt qui unde totam praesentium id?</p>
        </div>
    );
}

export default Poll