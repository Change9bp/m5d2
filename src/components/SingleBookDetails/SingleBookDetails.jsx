import React from "react";
import { Col, Card } from "react-bootstrap";

const SingleBookDetails = ({ oneBook }) => {
  return (
    <Col xs={12}>
      <Card>
        <Card.Img className="img-card" variant="top" src={oneBook.img} />
        <Card.Body>
          <Card.Title>{oneBook.title}</Card.Title>
          <Card.Text>
            {oneBook.category}
            <br />
            {oneBook.price}€
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleBookDetails;
