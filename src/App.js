/* eslint-disable */

// npm install styled-components

import { useState, createContext, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import CompanyMembers from "./Pages/companyMembers.js";
import CompanyLocation from "./Pages/companyLocation.js";
import data from "./data.js";
import Card from "./productCard.js";
import Detail from "./Pages/detail.js";
import "./App.css";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import Cart from "./Pages/Cart";

//context API //
export const Context1 = createContext();

function App() {
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
    console.log("useEffect running");
  }, []);

  let [shoes, setShoes] = useState(data);
  let [inventory, setInventory] = useState([11, 12, 13]);
  let [loadingPage, setLoadingPage] = useState(2);
  let navigate = useNavigate();

  return (
    <div className="App">
      {JSON.parse(localStorage.getItem("watched"))}

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
      {/* 
      <Link to="/">Home</Link>
      <Link to="/detail">Detail</Link> */}

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
                      <Card shoes={shoes} val={val} ind={ind} key={ind}></Card>
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
                          console.log(result.data);
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
