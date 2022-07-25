import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function Cart() {
  let stateFromStore = useSelector((state) => {
    return state.cartInfo;
  });
  console.log(stateFromStore);

  return (
    <div>
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
          {stateFromStore.map((val, idx) => {
            return (
              <tr>
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.count}</td>
                <td>
                  <button>✖️</button>
                  <button>➖</button>
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
