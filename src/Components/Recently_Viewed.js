/* eslint-disable*/
import { Card } from "react-bootstrap";

const LiveCart = ({ a, i, shoes }) => {
  const liveCartShoes = shoes.find((val) => {
    return val.id == parseInt(a);
  });

  return liveCartShoes ? (
    <div>
      <Card.Body
        style={{ cursor: "pointer" }}
        onClick={() => {
          console.log(liveCartShoes);
        }}
      >
        <Card.Title>{liveCartShoes.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {liveCartShoes.content}
        </Card.Subtitle>
        <Card.Text>{liveCartShoes.price}</Card.Text>
      </Card.Body>
      <hr />
    </div>
  ) : null;
};

export default LiveCart;
