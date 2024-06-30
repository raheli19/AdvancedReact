import React, { useState } from "react";
import "../css/Comments.css";

function Comments({ isOpen, onClose, comments, handleDeleteComment, user, postId, setComments }) {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    const newCommentObj = {
      postId: postId,
      id: Date.now(),
      name: user.name,
      email: user.email,
      body: newComment
    };

    fetch("https://jsonplaceholder.typicode.com/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommentObj),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data]);
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="comments-overlay">
      <div className="comments">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h4>Comments:</h4>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>Name: {comment.name}</p>
            <p>Email: {comment.email}</p>
            <p>{comment.body}</p>
            {comment.email === user.email && (
              <button onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>
            )}
          </div>
        ))}
        <div>
          <h4>Add Comment</h4>
          <input
            type="text"
            placeholder="New comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>
    </div>
  );
}

export default Comments;
