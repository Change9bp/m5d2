import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { PostProvider } from "../../contexts/reactContext";
import "./addComment.css";

const AddComment = ({ bookId }) => {
  const [formData, setFormData] = useState({ comment: null, rate: null });
  const [alert, setAlert] = useState("");
  const { message, setMessage, getComments } = useContext(PostProvider);

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value, elementId: bookId });
    console.log("form data", formData);
  }

  async function handleInputSubmit(e) {
    e.preventDefault();
    let canIPost = true;
    const keys = Object.keys(formData);

    for (const obj of keys) {
      if (!formData[obj]) {
        canIPost = false;
        break;
      }
    }

    if (canIPost) {
      try {
        const response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/",
          {
            method: "POST",
            body: JSON.stringify(formData),

            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzZDU5OTFmMTc1YzAwMTRjNTU5MTYiLCJpYXQiOjE2OTU2NzUyOTYsImV4cCI6MTY5Njg4NDg5Nn0._q2HMjervn_ZxsqPFxSiiURR9WOhr5KGYzZU19zRBOc",
            },
          }
        );
        e.target.reset();
        setFormData({ comment: null, rate: null, elementId: null });
        getComments();
        showMessage();
      } catch (error) {
        console.log(error);
      }
    } else {
      setAlert("Comment Area and Evaluation are required fields");
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  }

  function showMessage() {
    setMessage("POST");
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }

  return (
    <div>
      {alert ? <p className="danger">{alert}</p> : ""}
      {message === "POST" ? <p className="danger">Comment is posted</p> : ""}
      {message === "PUT" ? (
        <p className="danger">Comment is saved correctly</p>
      ) : (
        ""
      )}
      {message === "DELETE" ? <p className="danger">Comment is deleted</p> : ""}
      <Form onSubmit={handleInputSubmit}>
        <Form.Group>
          <Form.Label>comment area</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="comment"
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Group>
        <Form.Label>Evaluation</Form.Label>
        <div className="rating">
          <input
            type="radio"
            id="star5"
            name="rate"
            value="5"
            onClick={(e) => handleInputChange(e)}
          />
          <label htmlFor="star5" title="Molto bene">
            5 stelle
          </label>
          <input
            type="radio"
            id="star4"
            name="rate"
            value="4"
            onClick={(e) => handleInputChange(e)}
          />
          <label htmlFor="star4" title="Bene">
            4 stelle
          </label>
          <input
            type="radio"
            id="star3"
            name="rate"
            value="3"
            onClick={(e) => handleInputChange(e)}
          />
          <label htmlFor="star3" title="Nella media">
            3 stelle
          </label>
          <input
            type="radio"
            id="star2"
            name="rate"
            value="2"
            onClick={(e) => handleInputChange(e)}
          />
          <label htmlFor="star2" title="Scarso">
            2 stelle
          </label>
          <input
            type="radio"
            id="star1"
            name="rate"
            value="1"
            onClick={(e) => handleInputChange(e)}
          />
          <label htmlFor="star1" title="Molto scarso">
            1 stella
          </label>
        </div>
        <Button type="submit">Add Comment</Button>
      </Form>
    </div>
  );
};

export default AddComment;
