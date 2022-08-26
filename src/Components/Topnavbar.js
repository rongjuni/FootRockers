/* eslint-diable */
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import "./Topnavbar.css";

function Topnavbar({ setLiveCart, liveCart }) {
  const navigate = useNavigate();

  let nameImport = useQuery("name_import", () => {
    return axios
      .get("https://codingapple1.github.io/userdata.json")
      .then((result) => {
        return result.data;
      });
  });

  return (
    <Navbar bg="dark" variant="dark">
      <Container className="container">
        <Navbar.Brand href="/">FootRocker</Navbar.Brand>
        <Nav className="me-auto">
          <div style={{ display: "flex" }}>
            <Nav.Link
              // href="/"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>

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
          </div>
          <div className="content"></div>
          <div className="secondBox">
            <Nav.Link className="ms-auto">
              {nameImport.isLoading && "loading"}
              {nameImport.error && "error"}
              {nameImport.data && `Hi '${nameImport.data.name}'`}
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                setLiveCart(!liveCart);
              }}
            >
              Recently Viewed
            </Nav.Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Topnavbar;
