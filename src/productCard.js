import { useNavigate } from "react-router-dom";
import "./productCard.css";

function Card({ shoes, val, ind, setClickedProduct }) {
  const navigate = useNavigate();

  return (
    <div
      className="col-md-4 "
      onClick={() => {
        let loadingLocal = JSON.parse(localStorage.getItem("watched"));
        loadingLocal.push(val.id);
        localStorage.setItem("watched", JSON.stringify(loadingLocal));
        console.log(loadingLocal);
        navigate(`/detail/${ind}`);
      }}
    >
      <div className="mouseHoverPointer">
        {console.log(val)}
        <img
          src={"https://codingapple1.github.io/shop/shoes" + (ind + 1) + ".jpg"}
          width="80%"
          alt="shoes1"
        />
        <h4>{val.title}</h4>
        <p>{val.content}</p>
        <p>{val.price}</p>
      </div>
    </div>
  );
}

export default Card;
