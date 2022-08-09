import { useNavigate } from "react-router-dom";
import "./productCard.css";

function Card({ shoes, val, ind, setClickedProduct }) {
  const navigate = useNavigate();

  //since # of picture it not matching with data API, using same pictures after 7th

  return (
    <div
      className="col-md-4 "
      onClick={() => {
        navigate(`/detail/${ind}`);
      }}
    >
      {ind < 7 ? (
        <div className="mouseHoverPointer">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" + (ind + 1) + ".jpg"
            }
            // src={`https://codingapple1.github.io/shop/shoes${picture}.jpg`}
            width="80%"
            alt="shoes1"
          />
          <h4>{val.title}</h4>
          <p>{val.content}</p>
          <p>{val.price}</p>
        </div>
      ) : (
        <div className="mouseHoverPointer">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" + (ind - 6) + ".jpg"
            }
            // src={`https://codingapple1.github.io/shop/shoes${picture}.jpg`}
            width="80%"
            alt="shoes1"
          />
          <h4>{val.title}</h4>
          <p>{val.content}</p>
          <p>{val.price}</p>
        </div>
      )}
    </div>
  );
}

export default Card;
