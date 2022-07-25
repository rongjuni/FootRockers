// npm install styled-components
import react, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import "./detail.css";
import { Nav } from "react-bootstrap";

//context API import
import { Context1 } from "./../App";

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
  let { inventory } = useContext(Context1);

  console.log(inventory);
  let [count, setCount] = useState(0);
  let navigate = useNavigate();
  let { id } = useParams();
  let [discountAlert, setDiscountModal] = useState(true);
  let [tab, setTab] = useState(0);

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
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(0);
            }}
            eventKey="link0"
          >
            Button0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(1);
            }}
            eventKey="link1"
          >
            Button1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(2);
            }}
            eventKey="link2"
          >
            Button2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab}></TabContent>
    </div> // ending line
  );
};

function TabContent({ tab }) {
  // if (tab === 0) {
  //   return <div>content 0 story</div>;
  // } else if (tab === 1) {
  //   return <div>content 1 story</div>;
  // } else if (tab === 2) {
  //   return <div>content 2 story</div>;
  // }
  let { inventory } = useContext(Context1);

  return (
    <div className="aniStart aniEnd">
      {
        [
          <div>content 1 story</div>,
          <div>content 1 story</div>,
          <div>content 2 story</div>,
        ][tab]
      }
    </div>
  );
}
export default Detail;
