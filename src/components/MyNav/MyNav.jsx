import { nanoid } from "nanoid";
import React, { useContext, useState } from "react";
import {
  Form,
  Button,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { PostProvider } from "../../contexts/reactContext";

const MyNav = ({ linksNav }) => {
  const { arrBookOriginal, arrBookFiltered, setArrBookFiltered } =
    useContext(PostProvider);
  const [query, setQuery] = useState("");

  function changeValue(e) {
    setArrBookFiltered(
      arrBookOriginal.filter((filtered) =>
        filtered.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    console.log(arrBookFiltered);
    setQuery(e.target.value);
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-2">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {linksNav.map((link) => {
              return (
                <Nav.Link key={nanoid()} href={link.url}>
                  {link.label}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
        <Row className="justify-content-center">
          <Col sm={12}>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 rounded-pill"
                aria-label="Search"
                value={query}
                onChange={(e) => changeValue(e)}
              />
            </Form>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default MyNav;
