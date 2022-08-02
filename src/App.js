/* eslint-disable */

// npm install styled-components

import { useState, createContext, useEffect } from "react";
import { Navbar, Container, Nav, Card } from "react-bootstrap";
import CompanyMembers from "./Pages/companyMembers.js";
import CompanyLocation from "./Pages/companyLocation.js";
import data from "./data.js";
import Cards from "./productCard.js";
import Detail from "./Pages/detail.js";
import "./App.css";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import Cart from "./Pages/Cart";

//context API //
export const Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  let [inventory, setInventory] = useState([11, 12, 13]);
  let [loadingPage, setLoadingPage] = useState(2);
  let navigate = useNavigate();
  let dataInLocalstorage = JSON.parse(localStorage.getItem("watched"));
  console.log("data in storage", dataInLocalstorage);
  let [liveCart, setLiveCart] = useState(true);

  // useEffect(() => {
  {
    localStorage.getItem("watched")
      ? null
      : localStorage.setItem("watched", JSON.stringify([]));
    console.log("useEffect running");
  }
  // }, []);

  useEffect(() => {
    setLiveCart(true);
  }, []);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">FootRocker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            {/* <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link> */}
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div
        onClick={() => {
          setLiveCart(!liveCart);
        }}
        style={{ backgroundColor: "darkgrey" }}
      >
        Recently Viewed Items
      </div>

      {/* {console.log("data in storage II", dataInLocalstorage)} */}
      {liveCart == true ? (
        <Card
          style={{
            width: "18rem",
            position: "fixed",
            top: "5px",
            right: "5px",
            height: "100%",
          }}
        >
          {dataInLocalstorage.map((a, i) => {
            return <LiveCart a={a} i={i} shoes={shoes} />;
          })}
        </Card>
      ) : null}

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((val, ind) => {
                    return (
                      <Cards
                        shoes={shoes}
                        val={val}
                        ind={ind}
                        key={ind}
                      ></Cards>
                    );
                  })}
                </div>

                {loadingPage < 3 ? (
                  <button
                    onClick={() => {
                      axios
                        .get(
                          "https://codingapple1.github.io/shop/data" +
                            loadingPage +
                            ".json"
                        )
                        .then((result) => {
                          // console.log(result.data);
                          let copyShoes = [...shoes, ...result.data];
                          setShoes(copyShoes);
                          setLoadingPage(loadingPage + 1);
                        })
                        .catch((error) => {
                          console.log("error :", error);
                        });
                    }}
                  >
                    button
                  </button>
                ) : null}
              </div>
            </div>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ inventory }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<CompanyMembers />}></Route>
          <Route path="location" element={<CompanyLocation />}></Route>
        </Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="*" element={<div>Page Does Not Exist</div>} />
      </Routes>
    </div> // app div ending line
  );
}

export default App;

function About() {
  let navigate = useNavigate();

  return (
    <div>
      <h4>company info</h4>
      <button
        onClick={() => {
          navigate("/about/member");
        }}
      >
        Member
      </button>
      <button
        onClick={() => {
          navigate("/about/location");
        }}
      >
        Location
      </button>
      <Outlet></Outlet>
    </div>
  );
}

function LiveCart({ a, i, shoes }) {
  const liveCartShoes = shoes.find((val) => {
    return val.id == parseInt(a);
  });
  console.log("liveFound", liveCartShoes);
  return (
    <div>
      <Card.Body>
        <Card.Title>{liveCartShoes.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {liveCartShoes.content}
        </Card.Subtitle>
        <Card.Text>{liveCartShoes.price}</Card.Text>
      </Card.Body>
      <hr />
    </div>
  );
}
