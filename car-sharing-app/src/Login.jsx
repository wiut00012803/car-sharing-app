import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonalCabinet from "./Personal";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [usersDB, setUsersDB] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsersDB(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = usersDB.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setIsAuth(true);
      setUserInfo(user);
      onLogin();
    } else {
      alert("There is no such user");
    }
  };

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
