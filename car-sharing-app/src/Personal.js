import React from "react";
import { Link } from "react-router-dom";

const PersonalCabinet = ({ userInfo }) => {
  return (
    <div className="personal-cabinet">
      <header>
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
      </header>

      <h1>Personal Cabinet</h1>
      {userInfo ? (
        <div className="user-info">
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          {/* You can add more user information here if needed */}
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
      <div className="orders">
        <h2>My Orders:</h2>
        <ul>
          <li>Order #1</li>
          <li>Order #2</li>
          <li>Order #3</li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalCabinet;