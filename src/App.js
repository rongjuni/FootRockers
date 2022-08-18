/* eslint-disable */

// npm install styled-components

import { lazy, Suspense, useState, createContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { Navbar, Container, Nav, Card } from "react-bootstrap";
import CompanyMembers from "./Pages/companyMembers.js";
import CompanyLocation from "./Pages/companyLocation.js";
import data from "./data.js";
import Cards from "./productCard.js";
// import Detail from "./Pages/detail.js";
// import Cart from "./Pages/Cart";
import "./App.css";
import axios from "axios";
import { useQuery } from "react-query";

//context API //

const Detail = lazy(() => import("./Pages/detail.js"));
const Cart = lazy(() => import("./Pages/Cart.js"));
export const Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  let [inventory, setInventory] = useState([11, 12, 13]);
  let [loadingPage, setLoadingPage] = useState(2);
  let navigate = useNavigate();
  let dataInLocalstorage = JSON.parse(localStorage.getItem("watched"));
  console.log("data in storage", dataInLocalstorage);
  let [liveCart, setLiveCart] = useState(false);

  // useEffect(() => {
  {
    localStorage.getItem("watched")
      ? null
      : localStorage.setItem("watched", JSON.stringify([]));
    // console.log("useEffect running");
  }
  // }, []);

  useEffect(() => {
    {
      dataInLocalstorage.length > 0 ? setLiveCart(true) : null;
    }
  }, []);

  let nameImport = useQuery("name_import", () => {
    return axios
      .get("https://codingapple1.github.io/userdata.json")
      .then((result) => {
        console.log("useQuery requested", result.data);
        return result.data;
      });
    // ,
    // { staleTime: 2000 }
  });
  console.log("nameImport", nameImport);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">FootRocker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              // href="/"
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
            <Nav.Link
              style={{ position: "fixed", right: "5px" }}
              onClick={() => {
                setLiveCart(!liveCart);
              }}
            >
              Recently Viewed
            </Nav.Link>
            <Nav.Link className="ms-auto">
              {nameImport.isLoading && "loading"}
              {nameImport.error && "error"}
              {nameImport.data && `Hi '${nameImport.data.name}'`}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {console.log(nameImport)}
      {/* {console.log("data in storage II", dataInLocalstorage)} */}

      {liveCart == true ? (
        <Card
          style={{
            width: "18rem",
            position: "fixed",
            top: "3rem",
            right: "5px",
            height: "flex",
          }}
        >
          <div>
            {dataInLocalstorage.map((a, i) => {
              return <LiveCart key={i} a={a} i={i} shoes={shoes} />;
            })}
          </div>
        </Card>
      ) : null}

      <Suspense fallback={<div>Loading....</div>}>
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

                  {loadingPage < 4 ? (
                    <button
                      className="btn btn-danger regButton"
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
                      Load More
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
      </Suspense>
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
  // console.log("liveFound in liveCart function", liveCartShoes);
  return liveCartShoes ? (
    <div>
      <Card.Body
        style={{ cursor: "pointer" }}
        onClick={() => {
          console.log(liveCartShoes);
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
}
