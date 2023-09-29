import React, { useState, useContext } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PostProvider } from "../../contexts/reactContext";
import "./SingleBook.css";

const SingleBook = ({ oneBook }) => {
  const [borderRed, setBorderRed] = useState("");
  const { selected, setSelected } = useContext(PostProvider);

  function changeSelected(e) {
    if (selected === oneBook.asin) {
      setSelected(null);
    } else {
      setSelected(oneBook.asin);
    }
  }

  return (
    <Col xs={4}>
      <Card>
        <Card.Img
          className={`img-card ${oneBook.asin === selected ? "borderRed" : ""}`}
          variant="top"
          src={oneBook.img}
          onClick={changeSelected}
        />
        <Card.Body>
          <Card.Title>{oneBook.title}</Card.Title>
          <Card.Text>
            {oneBook.category}
            <br />
            {oneBook.price}€
          </Card.Text>
          <Button id="bookDetails">
            <Link to={`/bookdetails/${oneBook.asin}`}>Details</Link>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleBook;
