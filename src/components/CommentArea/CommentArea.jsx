import React, { useContext, useEffect, useState } from "react";
import CommentList from "../CommentList/CommentList";
import AddComment from "../AddComment/AddComment";
import CircleSpinner from "../CircleSpinner/CircleSpinner";
import { Container } from "react-bootstrap";
import { PostProvider } from "../../contexts/reactContext";
import "./CommentArea.css";

const CommentArea = () => {
  const { selected, isLoading, getComments, reviews, errors } =
    useContext(PostProvider);

  useEffect(() => {
    getComments();
  }, [selected]);

  return (
    selected && (
      <Container id="comment_area" className="no_shrink my-5">
        <h3>Add comments</h3>
        <AddComment bookId={selected} />
        <h4>Comments</h4>
        {isLoading ? <CircleSpinner /> : <CommentList listReviews={reviews} />}
      </Container>
    )
  );
};

export default CommentArea;
