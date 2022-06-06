import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from 'react-router-dom';
import { Context } from "../../context/Context";
import './login.css'

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login" >
    <span className="login-title">Log In</span>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          className="login-input" 
          type="text" 
          placeholder="Enter your Username"
          ref={userRef}
        />
        <label>Password</label>
        <input 
          className="login-input" 
          type="password" 
          placeholder="Enter your password"
          ref={passwordRef}
        />
        <button className="login-btn" type="submit" disabled={isFetching}>Log In</button>
      </form>
        <buton className="login-register-btn">
          <Link className="link" to="register">Register</Link>
        </buton>
    </div>
  );
}