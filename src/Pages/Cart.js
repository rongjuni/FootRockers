import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { increaseCart, decreaseCart, deletingCart } from "../store";
import { changeName, incrementNumber } from "../store/userSlice";

function Cart() {
  //redux
  let stateFromStore = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();
  // console.log(stateFromStore);
  //redux chaning state

  return (
    <div>
      {stateFromStore.anyName.name}
      {stateFromStore.anyName.age}
      <button
        onClick={() => {
          dispatch(incrementNumber(10));
        }}
      >
        PLUS
      </button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Products</th>
            <th>Qty</th>
            <th>+/-</th>
          </tr>
        </thead>
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
                    ✖️
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
