/* eslint-disable */

// npm install styled-components
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import "./detail.css";
import { Form, Nav } from "react-bootstrap";
import SizeChart from "../Components/sizeChart"
import ShippingPolicy from "../Components/ShippingPolicy";
import RefundPolicy from "../Components/RefundPolicy";

//redux for 'order now' button

//context API import
import { Context1 } from "./../App";
import { useDispatch, useSelector } from "react-redux";
import { addingMoreInCart } from "../store";

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
  const dispatch = useDispatch();

  let { inventory } = useContext(Context1);

  // console.log(inventory);
  let [count, setCount] = useState(0);
  let navigate = useNavigate();
  let { id } = useParams();
  let [discountAlert, setDiscountModal] = useState(true);
  let [tab, setTab] = useState(0);

  const detailFound = shoes.find((valueInShoesArray) => {
    return valueInShoesArray.id == id;
  });

  // console.log("detailFound", detailFound);
  useEffect(() => {
    let loadingLocal = JSON.parse(localStorage.getItem("watched"));
    loadingLocal.push(detailFound.id);
    //removing repeated number
    loadingLocal = new Set(loadingLocal);
    loadingLocal = Array.from(loadingLocal);

    localStorage.setItem("watched", JSON.stringify(loadingLocal));
    // console.log(loadingLocal);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDiscountModal(false);
    }, 2000);
  }, []);

  return (
    <div className="container">
      {discountAlert == true ? (
        <div
          className="alert alert-warning"
          style={{ width: "50%", margin: "auto" }}
        >
          Order Now! Discounts are available only for next 10 days.
        </div>
      ) : null}

      {console.log("console id", typeof parseInt(id))}

      <div className="row">
        <div className="col-md-6">
          {clickedProduct}
          {parseInt(id) < 7 ? (
            <img
              src={`https://codingapple1.github.io/shop/shoes${
                parseInt(id) + 1
              }.jpg`}
              width="100%"
              alt="shoes pictures"
            />
          ) : (
            // using exisiting picture due to lack of new pictures
            <img
              src={`https://codingapple1.github.io/shop/shoes${
                parseInt(id) - 6
              }.jpg`}
              width="100%"
              alt="shoes pictures"
            />
          )}
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{detailFound.title}</h4>
          <p>{detailFound.content}</p>
          <p>{detailFound.price}</p>
          <button
            className="btn btn-danger regButton"
            onClick={() => {
              dispatch(addingMoreInCart(detailFound));
            }}
          >
            Add to Cart
          </button>
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
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(0);
            }}
            eventKey="link0"
          >
            Size
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(1);
            }}
            eventKey="link1"
          >
            Shipping
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(2);
            }}
            eventKey="link2"
          >
            Return
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab}></TabContent>
    </div> // ending line
  );
};

function TabContent({ tab }) {
  let { inventory } = useContext(Context1);

  return (
    <div className="aniStart aniEnd">
      {
        [
          <div><SizeChart></SizeChart></div>,
          <div>
            <ShippingPolicy></ShippingPolicy>
          </div>,
          <div><RefundPolicy></RefundPolicy></div>,
        ][tab]
      }
    </div>
  );
}

export default Detail;
