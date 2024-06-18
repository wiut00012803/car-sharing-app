import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonalCabinet from "./Personal";

// this component handles the user login
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState(""); // state to hold the email input
  const [password, setPassword] = useState(""); // state to hold the password input
  const [isAuth, setIsAuth] = useState(false); // state to check if user is authenticated
  const [userInfo, setUserInfo] = useState(null); // state to hold user info
  const navigate = useNavigate(); // hook to navigate programmatically

  // function to handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/login", { email, password });
      if (response.data.success) {
        setIsAuth(true);
        setUserInfo(response.data.user);
        onLogin();
        navigate("/personal"); // redirect to personal profile page
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // render the login form or personal cabinet based on authentication status
  return isAuth ? (
    <PersonalCabinet userInfo={userInfo} />
  ) : (
    <div className="login-container">
      <h1>Log In</h1>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/" className="button">
              Get a Car
            </Link>
          </li>
          <li>
            <Link to="/" className="button">
              Rent Out
            </Link>
          </li>
          <li>
            <Link to="/login" className="button">
              Log In
            </Link>
          </li>
          <li>
            <Link to="/personal" className="button">
              Personal Cabinet
            </Link>
          </li>
        </ul>
      </nav>

      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;