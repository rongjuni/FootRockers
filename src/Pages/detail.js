// npm install styled-components
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import "./detail.css";

// let ColorButton = styled.button`
//   background: ${(props) => props.x};
//   color: ${(props) => (props.x == "blue" ? "white" : "black")};
//   padding: 10px;
// `;

// //if i want to copy same button but customize
// let NewColorButton = styled.button(ColorButton)`
//   margin: 20px;
// `;

const Detail = ({ clickedProduct, shoes }) => {
  let [count, setCount] = useState(0);
  let navigate = useNavigate();
  let { id } = useParams();
  let [discountAlert, setDiscountModal] = useState(true);

  const detailFound = shoes.find((valueInShoesArray) => {
    return valueInShoesArray.id == id;
  });

  useEffect(() => {
    setTimeout(() => {
      setDiscountModal(false);
    }, 2000);
  }, []);

  return (
    <div className="container">
      {discountAlert == true ? (
        <div className="alert alert-warning">discount</div>
      ) : null}
      {/* <ColorButton x="blue">button</ColorButton> */}
      {/* <ColorButton x="yellow">button</ColorButton> */}
      {/* <NewColorButton x="red">New Button </NewColorButton> */}
      <div className="row">
        <div className="col-md-6">
          {clickedProduct}
          <img
            src={`https://codingapple1.github.io/shop/shoes1.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{detailFound.title}</h4>
          <p>{detailFound.content}</p>
          <p>{detailFound.price}</p>
          <button className="btn btn-danger regButton">Order Now</button>
          <button
            className="btn btn-danger regButton"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;

//ae ssem ma lu bi ddo ddang//
