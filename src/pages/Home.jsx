import React from "react";
import MyNav from "../components/MyNav/MyNav";
import MyFooter from "../components/MyFooter/MyFooter";
import Welcome from "../components/Welcome/Welcome";
import { navLinks } from "../data/myNavLinks";
import PostContext from "../contexts/reactContext";
import LatestRelease from "../components/LatestRelease/LatestRelease";
import CommentArea from "../components/CommentArea/CommentArea";
import { Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <PostContext>
        <MyNav linksNav={navLinks} />
        <Welcome />
        <Container>
          <Row className="flex-nowrap">
            <LatestRelease />
            <CommentArea />
          </Row>
        </Container>
      </PostContext>
      <MyFooter />
    </>
  );
};

export default Home;
