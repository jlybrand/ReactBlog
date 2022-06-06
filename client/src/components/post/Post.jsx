import React from "react";
import { Link } from "react-router-dom";
import "./post.css"

export default function Post({post}) {
  const publicFolder = "http://localhost:5000/images/";
  var options = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className="post">
      {post.photo && <img className="post-img" src={publicFolder + post.photo} alt=""/>}
      <div className="post-info">
        <div className="post-categories"> 
          {post.categories.map((cat, i) => (
            <span key={i} className="post-category">{cat.name}</span>
          ))}
        </div>
        <Link to={`/posts/${post._id}`} className="link">
          <span className="post-title">{post.title}</span>
        </Link>
        <hr /> 
        <span className="post-date">
          {new Date(post.createdAt).toLocaleDateString("en-US", options)}
          </span> 
        </div>
        <p className="post-description">{post.desc}</p> 
    </div>
  );
}
