import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addPost } from "../../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(addPost({ text }));
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default PostForm;
