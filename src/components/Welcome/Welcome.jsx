import React from "react";
import "./Welcome.css";
import { Container } from "react-bootstrap";

const Welcome = () => {
  return (
    <Container id="jumbo" className="rounded-3">
      <h1 className="fs-1">Leggi, CAPRA!</h1>
      <p>
        Capra, Capra, Capra, Capra, Capra, Capra, Capra, Capra, Capra, Capra,
        Capra, Capra, Capra, Capra,
      </p>
    </Container>
  );
};

export default Welcome;
