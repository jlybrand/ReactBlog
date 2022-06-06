import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./navbar.css"


export default function Navbar() {
  const { user, dispatch } = useContext(Context);
  const publicFolder = "http://localhost:5000/images/";

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT"});
  };

  return (
    <div className='nav-bar'>
      <div className="nav-left">
        <p>Share Musical Stories</p>
      </div>
      <div className="nav-center">
        <ul className="nav-list">
          <li className="nav-list-item">
            <Link to="/" className="link">HOME</Link>
          </li>
          <li className="nav-list-item">
            <Link to="/about" className="link">ABOUT</Link>
          </li>
          <li className="nav-list-item">
            <Link to="/contact" className="link">CONTACT</Link>
          </li>
          <li className="nav-list-item">
            <Link to="/write" className="link">WRITE</Link>
          </li>
          <li className="nav-list-item" onClick={handleLogOut}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="nav-right">
        {user ? (
          <Link to="/settings">
            <img
              className="nav-img"
              src={`${publicFolder}${user.profilePic}`}
              alt=""
            />
          </Link>
        ) : (
          <ul className="nav-list">
            <li className="nav-list-item">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="nav-list-item">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
          <i className="navSearch fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  )
}

