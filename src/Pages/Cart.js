/* eslint-disable */

import { memo, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { increaseCart, decreaseCart, deletingCart } from "../store";
import { changeName, incrementNumber } from "../store/userSlice";

// function Child() {
let Child = memo(function () {
  console.log("re-rendering test");
  // return <div>CHLID COMPONENT</div>;
});

function Cart() {
  //redux
  let stateFromStore = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();
  //redux chaning state

  let [countExample, setCountExample] = useState(0);

  return (
    <div>
      {/* <Child></Child> */}
      {/* <button
        onClick={() => {
          setCountExample(countExample + 1);
        }}
      >
        {" "}
        PLUS
      </button> */}
      {/* {stateFromStore.anyName.name}
      {stateFromStore.anyName.age}
      <button
        onClick={() => {
          dispatch(incrementNumber(10));
        }}
      >
        PLUS
      </button> */}
      {/* {console.log("statefromstore", stateFromStore)} */}
      <Table striped bordered hover>
        {stateFromStore.cartInfo[0] ? (
          <thead>
            <tr>
              <th>#</th>
              <th>Products</th>
              <th>Qty</th>
              <th>+/-</th>
            </tr>
          </thead>
        ) : (
          <div>Your Cart is Emtpy</div>
        )}
        <tbody>
          {stateFromStore.cartInfo.map((val, idx) => {
            return (
              <tr key={idx}>
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(increaseCart(val.id));
                    }}
                  >
                    ➕
                  </button>
                  <button
                    onClick={() => {
                      dispatch(decreaseCart(val.id));
                    }}
                  >
                    ➖
                  </button>
                  <button
                    onClick={() => {
                      dispatch(deletingCart(val.id));
                    }}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
