import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../reducers/post";
import { Link } from "react-router-dom";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
}) => {
  const dispatch = useDispatch();
  const { user: authUser, loading } = useSelector((state) => state.auth);

  return (
    <div className="post bg-white p-1 my-1" key={_id}>
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on {moment(date).format("YYYY/MM/DD")}
        </p>
        {!loading && user === authUser._id && (
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => dispatch(deleteComment({ postId, commentId: _id }))}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
};

export default CommentItem;
