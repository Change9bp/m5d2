import React, { useContext, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./LatestRelease.css";
import SingleBook from "../SingleBook/SingleBook";
import { PostProvider } from "../../contexts/reactContext";

const LatestRelease = () => {
  const { arrBookFiltered } = useContext(PostProvider);

  return (
    <Container className="no_shrink my-5">
      <Row className="g-3">
        {arrBookFiltered.map((card) => (
          <SingleBook key={card.asin} oneBook={card} />
        ))}
      </Row>
    </Container>
  );
};

export default LatestRelease;
