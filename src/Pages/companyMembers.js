import myPic from "../img/myPic.jpg";
import dcPic from "../img/marco.png";
import "./companyMembers.css";

const companyMembers = () => {
  return (
    <div>
      <div>
        <div className="members">
          <h1>Matthew Seo</h1>
          <h3>President</h3>
          <img className="mypicture" src={myPic} alt="myPicture" />
          <hr />
        </div>
        <div className="members">
          <h1>Marco Seo</h1>
          <h3>Vice-President / Software Developer</h3>
          <img className="mypicture" src={dcPic} alt="myPicture" />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default companyMembers;
