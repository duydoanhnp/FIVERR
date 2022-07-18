import React, { useEffect, useRef, useState } from "react";
import { http } from "../../util/setting";
import "../../scss/_Comment.scss";

export default function Comment({ jobId, isLogin }) {
  const [comment, setComment] = useState([]);
  const [text, setText] = useState();
  const inputCommentRef = useRef(null);

  const getCommentList = async () => {
    try {
      const result = await http.get(`/api/comments/by-job/${jobId}`);
      console.log(result);
      if (!result.data) throw "No comment";
      setComment(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const enterComment = async (event) => {
    const { keyCode } = event;
    if (keyCode === 13 && text)
      try {
        const result = await http.post("/api/comments", {
          content: text,
          job: jobId,
        });
        if (!result.data) throw "Can't comment ";
        setText(""); // set input create comment empty
        getCommentList();
        inputCommentRef.current.blur(); // exit focus input box
      } catch (error) {
        console.log(error);
      }
  };

  const changeCommentInput = (event) => {
    const comment = event.target.value;
    setText(comment);
  };

  const renderComment = () => {
    return comment.map((Comment, index) => {
      return (
        <ul type="none" className="usercomment" key={index}>
          <li className="comment-list">
            <div className="avatar">
              <img src={Comment.user?.avatar} />
            </div>
            <div className="content">
              <h6>{Comment.user.name}</h6>
              <p>{Comment.content}</p>
            </div>
          </li>
        </ul>
      );
    });
  };

  useEffect(() => {
    getCommentList();
  }, [jobId]);

  return (
    <div className="comment">
      <h3>Reivews</h3>
      {isLogin && <h5>Creat new comment</h5>}
      {isLogin && (
        <input
          className="input"
          ref={inputCommentRef}
          placeholder="Comment..."
          type="text"
          value={text}
          onChange={changeCommentInput}
          onKeyUp={enterComment}
        />
      )}
      <section className="comment-main">
        <h5>Comment</h5>
        <div>{renderComment()}</div>
      </section>
      {!isLogin && !comment.length > 0 && <p>No Comment</p>}
    </div>
  );
}
