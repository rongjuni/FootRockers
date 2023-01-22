/* eslint-disable */

// npm install styled-components

import { lazy, Suspense, useState, createContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { Navbar, Container, Nav, Card, Button } from "react-bootstrap";
import CompanyMembers from "./Pages/companyMembers.js";
import CompanyLocation from "./Pages/companyLocation.js";
import data from "./data.js";
import Cards from "./Components/productCard.js";
import "./App.css";
import axios from "axios";
import Topnavbar from "./Components/Topnavbar";
import Recently_Viewed from "./Components/Recently_Viewed";
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
  let [liveCart, setLiveCart] = useState(false);

  {
    localStorage.getItem("watched")
      ? null
      : localStorage.setItem("watched", JSON.stringify([]));
  }

  // useEffect(() => {
  //   {
  //     dataInLocalstorage.length > 0 ? setLiveCart(true) : null;
  //   }
  // }, []);

  return (
    <div className="App">
      <Topnavbar setLiveCart={setLiveCart} liveCart={liveCart}></Topnavbar>

      {liveCart == true ? (
        <Card
          className="recently-viewed-box"
          // style={{ overflowY: "scroll", maxHeight: "100%" }}
        >
          <div className="recentViewHideButton">
            <span
              className="recentViewHideButton-hide"
              onClick={() => {
                setLiveCart(!liveCart);
                // localStorage.clear();
              }}
            >
              👁‍🗨
            </span>
            <span> </span>
            <span
              className="recentViewHideButton-delete"
              onClick={() => {
                setLiveCart(!liveCart);
                localStorage.clear();
                alt="delete"
              }}
            >
              ❌
            </span>
          </div>
          <div>
            {dataInLocalstorage.map((a, i) => {
              return <Recently_Viewed key={i} a={a} i={i} shoes={shoes} />;
            })}
          </div>
        </Card>
      ) : (
        <Card className="recently-viewed-box-unhide">
          <div
            className="recentViewUnhideButton"
            onClick={() => {
              setLiveCart(!liveCart);
            }}
          >
            👁‍🗨
          </div>
        </Card>
      )}

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
      <h4>FootRocker Info</h4>
      <Button
        className="button-design"
        variant="outline-secondary"
        onClick={() => {
          navigate("/about/member");
        }}
      >
        Members
      </Button>

      <Button
        className="button-design"
        variant="outline-secondary"
        onClick={() => {
          navigate("/about/location");
        }}
      >
        Location
      </Button>

      <Outlet></Outlet>
    </div>
  );
}
