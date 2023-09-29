import React, { useContext, useState, useEffect } from "react";
import "./singleComment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { PostProvider } from "../../contexts/reactContext";

const SingleComment = ({ oneComment }) => {
  const [inEditing, setInEditing] = useState(false);
  const [singleCommEdit, setSingleCommEdit] = useState(oneComment);
  const [errorFetch, setErrorFetch] = useState(null);
  const [user, setUser] = useState("ale.contestabile@gmail.com");
  const { token, getComments, message, setMessage } = useContext(PostProvider);

  // assegno stelle
  function evaluation() {
    let arrStar = [];
    for (let index = 0; index < singleCommEdit.rate; index++) {
      arrStar.push(
        <FontAwesomeIcon
          icon={faStar}
          size="sm"
          style={{ color: "rgb(225 225 75)" }}
        />
      );
    }

    return arrStar;
  }

  //modifico il post
  function modifyCancel() {
    setInEditing(!inEditing);
    console.log(inEditing);
  }

  // imposto singleCommEdit con i dati inseriti in input quando modifico il commento
  function handleInputEdit(e) {
    const { name, value } = e.target;

    setSingleCommEdit({
      ...singleCommEdit,
      [name]: value,
    });

    console.log(singleCommEdit);
  }

  function putComment() {
    putDelComments("PUT");
  }

  function delComment() {
    putDelComments("DELETE");
  }

  // una sola funzione per la PUT e la DELETE
  async function putDelComments(methodFetch) {
    try {
      if (
        methodFetch === "DELETE"
          ? window.confirm("Sei sicuro di voler cancellare il commento?")
          : !!methodFetch
      ) {
        const response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" +
            singleCommEdit._id,
          {
            method: methodFetch,
            ...(methodFetch === "PUT" && {
              body: JSON.stringify(singleCommEdit),
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: token,
            },
          }
        );
        methodFetch === "PUT" && setInEditing(!inEditing);
      }
      getComments();
      showMessage(methodFetch);
    } catch (error) {
      setErrorFetch(
        `Non è stato possibile ${
          methodFetch === "DELETE" ? "cancellare" : "modificare"
        } il commento, errore dal SERVER`
      );
      console.log(error);
    }
  }

  function showMessage(methodFetch) {
    setMessage(methodFetch);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }

  return (
    <div className="col-12">
      <div className="card card-white post">
        <div className="post-heading">
          <div className="float-left meta">
            <div className="title h5">
              {oneComment.author === "ale.contestabile@gmail.com" &&
                (!inEditing
                  ? [
                      <Button onClick={modifyCancel} size="sm">
                        Edit
                      </Button>,
                      <Button onClick={delComment} size="sm">
                        Delete
                      </Button>,
                    ]
                  : [
                      <Button onClick={putComment} size="sm">
                        Save
                      </Button>,
                      <Button onClick={modifyCancel} size="sm">
                        Cancel
                      </Button>,
                    ])}
              <br />
              <a href="#">
                {!inEditing ? (
                  <b>{singleCommEdit.author}</b>
                ) : (
                  <input
                    className="inputModify"
                    name="author"
                    type="text"
                    value={singleCommEdit.author}
                    onChange={handleInputEdit}
                  ></input>
                )}
              </a>
            </div>
            <h6 className="text-muted time">{singleCommEdit.updatedAt}</h6>
            {!inEditing ? (
              <div>{evaluation()}</div>
            ) : (
              <input
                className="inputModify"
                name="rate"
                type="number"
                value={singleCommEdit.rate}
                onChange={handleInputEdit}
              ></input>
            )}
          </div>
        </div>
        <div className="post-description">
          {!inEditing ? (
            <p>{singleCommEdit.comment}</p>
          ) : (
            <input
              className="inputModify"
              name="comment"
              type="text"
              value={singleCommEdit.comment}
              onChange={handleInputEdit}
            ></input>
          )}
        </div>
      </div>
      {errorFetch ? <p>${errorFetch}</p> : ""}
    </div>
  );
};

export default SingleComment;
