import React, { createContext, useState } from "react";
import arrBooks from "../data/fantasy.json";

export const PostProvider = createContext();

const PostContext = ({ children }) => {
  const [arrBookOriginal, setArrBookOriginal] = useState(arrBooks);
  const [arrBookFiltered, setArrBookFiltered] = useState(arrBooks);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null);
  const [selected, setSelected] = useState(null);
  const [token, setToken] = useState(
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzZDU5OTFmMTc1YzAwMTRjNTU5MTYiLCJpYXQiOjE2OTU2NzUyOTYsImV4cCI6MTY5Njg4NDg5Nn0._q2HMjervn_ZxsqPFxSiiURR9WOhr5KGYzZU19zRBOc"
  );

  async function getComments() {
    try {
      if (selected) {
        setIsLoading(true);

        const response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" + selected,

          {
            headers: {
              Authorization: token,
            },
          }
        );
        const data = await response.json();
        setReviews(data);
        setIsLoading(false);
        console.log("commenti", data);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.log(error);
      setErrors("Non è stato possibile recuperare i commenti, Riprovare");
      setIsLoading(false);
    }
  }

  return (
    <PostProvider.Provider
      value={{
        arrBookOriginal,
        arrBookFiltered,
        selected,
        isLoading,
        errors,
        reviews,
        token,
        message,
        setMessage,
        setSelected,
        setArrBookFiltered,
        getComments,
      }}
    >
      {children}
    </PostProvider.Provider>
  );
};

export default PostContext;
