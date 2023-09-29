import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import SingleComment from "../SingleComment/SingleComment";
import "./CommentList.css";

const CommentList = ({ listReviews }) => {
  console.log("lista reviews passata in commentList", listReviews);
  return (
    <Container>
      <Row>
        {listReviews[0] != null ? (
          listReviews.map((oneReview) => {
            return <SingleComment key={oneReview._id} oneComment={oneReview} />;
          })
        ) : (
          <h6>Non ci sono commenti</h6>
        )}
      </Row>
    </Container>
  );
};

export default CommentList;
