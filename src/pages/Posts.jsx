import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Comments from "./Comments";
import "../css/Posts.css";

function Posts({user}) {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { userId } = useParams();
  const [areCommentsOpen, setAreCommentsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        localStorage.setItem("posts", JSON.stringify(data)); // Save posts to local storage
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [user]);

  const handleAddPostClick = () => {
    navigate("/NewPost");
  };

  const handleCommentsClick = (postId) => {
    setSelectedPostId(postId);
    setAreCommentsOpen(true);
    fetch(`http://localhost:3000/comments?postId=${postId}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
  };

  const handleDeleteComment = (commentId) => {
    fetch(`http://localhost:3000/comments/${commentId}`, {
      method: "DELETE",
    })
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== commentId));
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  const handleDeletePost = (id) => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedPosts = posts.filter((post) => post.id !== id);
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Update local storage
        setSelectedPostId(null); // Unselect post after deletion
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  const handleUpdatePost = (id) => {
    const updatedPost = posts.find((post) => post.id === id);
    const newTitle = prompt("Enter new title:", updatedPost.title);
    const newBody = prompt("Enter new body:", updatedPost.body);

    fetch(`http://localhost:3000/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updatedPost, title: newTitle, body: newBody }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedPosts = posts.map((post) => (post.id === id ? data : post));
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Update local storage
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  const filteredPosts = posts.filter((post) =>
    post.id.toString().includes(searchTerm) || post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

   useEffect(() => {
  const hash = window.location.hash;
  if (hash) {
    const id = hash.replace('#', '');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}, []);

  return (
    <div className="posts">
      <div className="posts-header">
        <h2>Posts</h2>
        <button onClick={handleAddPostClick} className="add-post-button">Add New Post</button>
      </div>
      <div className="search">
        <input
        type="text"
        placeholder="Search posts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      </div>
      
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <div
            onClick={() => handlePostClick(post.id)}
            key={post.id}
            className={selectedPostId === post.id ? "selected-post post" : "post"}
          >
            <h3>{post.title}</h3>
            {selectedPostId === post.id && (
              <div>
                <p>{post.body}</p>
                <button onClick={() => handleUpdatePost(post.id)}>Edit Post</button>
                <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                <button onClick={(e) => { e.stopPropagation(); handleCommentsClick(post.id); }}>
                  View Comments
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {areCommentsOpen && (
        <Comments
          isOpen={areCommentsOpen}
          onClose={() => setAreCommentsOpen(false)}
          comments={comments}
          handleDeleteComment={handleDeleteComment}
          user={user}
          setComments={setComments}
          postId={selectedPostId}
        />
      )}
      <div id="bottom"></div>
    </div>
  );
}

export default Posts;
