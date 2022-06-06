import axios from "axios";
import { useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import "./singlepost.css";

export default function SinglePost() {
  const publicFolder = "http://localhost:5000/images/";
  const location = useLocation()
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const [postBody, setPostBody] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  var options = { year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      // setPostBody(res.data.postBody);
    };

    getPost();
  }, [path]);

  const handleDelete = async (e) => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });

      window.location.replace("/");

    } catch (error) { }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
        // postBody,
      });

      setUpdateMode(false);

    } catch (error) { }
  };

  return (
    <div className="single-post">
      <div className="single-post-wrap">
        {post.photo && (
          <img
            src={`${publicFolder}${post.photo}`}
            alt=""
            className="single-post-img"
          />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="single-post-title-input"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="single-post-title">
            {title}
            {post.username === user?.username && (
              <div className="post-edit-container">
                <i
                  className="edit-icon far fa-edit"
                  onClick={(e) => setUpdateMode(true)}
                >
                </i>
                <i
                  className="edit-icon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="post-info">
          <span className="author">
            <b>Written by: </b>
            {/* should have full name stored in DB */}
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span>{new Date(post.createdAt).toLocaleDateString("en-US", options)}</span>
        </div>
        {updateMode ? (
          <textarea
            className="single-post-input"
            value={desc}
            autoFocus
            onChange={(e) => setDesc(e.target.value)}
          />

        ) : (
          <p className="single-post-description">{desc}</p>
        )}

        {/* {updateMode ? (
          <textarea
            className="single-post-input"
            value={postBody}
            autoFocus
            onChange={(e) => setPostBody(e.target.value)}
          />

        ) : (
          <p className="single-post-pody">{postBody}</p>
        )} */}

        {
          (updateMode && (
            <button className="post-bttn" onClick={handleUpdate}>
              Update
            </button>
          ))
        }
      </div>
    </div>
  );
}

