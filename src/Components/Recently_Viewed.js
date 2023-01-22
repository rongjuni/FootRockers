/* eslint-disable*/
import { React, useState } from "react";
import { Card } from "react-bootstrap";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";



const LiveCart = ({ a, i, shoes }) => {
  
  let navigate = useNavigate();
  let [recentViewOnOff, setRecentViewOnOff] = useState(true)

  const liveCartShoes = shoes.find((val) => {
    return val.id == parseInt(a);
  });



  return liveCartShoes ? (
    <div>
      <Card.Body
        style={{ cursor: "pointer" }}
        onClick={() => {
          console.log("liveCartShoes", liveCartShoes.id, a);
          navigate("/detail/"+a);
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
