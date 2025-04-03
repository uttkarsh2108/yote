import yoteHomepage from "./../../assets/yoteHomepage.png"
import "./Home.css"

function Home(){
    return (
        <>
            <img src={yoteHomepage}></img><br/><hr/><br/>
            <div className="about-us">
                <h1>About Us</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui fuga rerum delectus, distinctio commodi, eligendi natus illum nostrum velit nesciunt doloremque amet laudantium quia sed fugiat iusto nulla cupiditate eaque? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil tenetur esse, ducimus voluptate quia atque blanditiis quos ipsum magni eligendi? Eos est corrupti vitae eum voluptates hic ea molestias ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione accusamus assumenda repellendus nesciunt maiores mollitia rem dignissimos vitae culpa accusantium, molestiae molestias delectus sapiente maxime enim, doloribus esse explicabo animi!</p>
            </div>
        </>
    );
}

export default Home