/* eslint-disable */

// npm install styled-components

import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import data from "./data.js";
import Card from "./productCard.js";
import Detail from "./Pages/detail.js";
import "./App.css";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();

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
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
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
              </div>
            </div>
          }
        />

        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>member member</div>}></Route>
          <Route path="location" element={<div>location</div>}></Route>
        </Route>
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
