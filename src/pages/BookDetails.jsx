import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import arrBooks from "../data/fantasy.json";
import SingleBook from "../components/SingleBook/SingleBook";
import MyNav from "../components/MyNav/MyNav";
import CommentList from "../components/CommentList/CommentList";
import CircleSpinner from "../components/CircleSpinner/CircleSpinner";
import SingleBookDetails from "../components/SingleBookDetails/SingleBookDetails";
import { Container } from "react-bootstrap";
import { navLinks } from "../data/myNavLinks";
import "./bookDetails.css";

// rafce template componente

const BookDetails = () => {
  const [allTheBook, setAllTheBook] = useState(arrBooks);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { bookasin } = useParams();

  const singleBookDetails = allTheBook.filter((book) => book.asin === bookasin);
  console.log(singleBookDetails);

  async function getComments() {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + bookasin,

        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzZDU5OTFmMTc1YzAwMTRjNTU5MTYiLCJpYXQiOjE2OTU2NzUyOTYsImV4cCI6MTY5Njg4NDg5Nn0._q2HMjervn_ZxsqPFxSiiURR9WOhr5KGYzZU19zRBOc",
          },
        }
      );
      const data = await response.json();
      setReviews(data);
      setIsLoading(false);
      console.log("commenti", data);
    } catch (error) {
      console.log(error);
      setErrors("Non è stato possibile recuperare i commenti, Riprovare");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getComments();
  }, [bookasin]);

  return (
    <>
      <MyNav linksNav={navLinks} />
      <Container id="bDetails">
        <div id="detailsLeft">
          <SingleBookDetails oneBook={singleBookDetails[0]} />
        </div>
        <div id="detailsRight">
          <h3>Add comments</h3>
          <h4>Comments</h4>
          {isLoading ? (
            <CircleSpinner />
          ) : (
            <CommentList listReviews={reviews} />
          )}
        </div>
      </Container>
    </>
  );
};

export default BookDetails;
