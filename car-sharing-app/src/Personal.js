import React from "react";
import { users } from "./const";
import { Link } from "react-router-dom";

function PersonalCabinet() {
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
      <div className="user-info">
        <p>
          <strong>First Name:</strong> {users[0].firstName}
        </p>
        <p>
          <strong>Email:</strong> {users[0].email}
        </p>
        <p>
          <strong>Phone Number:</strong> {users[0].phoneNumber}
        </p>
      </div>
      <div className="orders">
        <h2>My orders:</h2>
        <ul>
          <li>Order #1</li>
          <li>Order #2</li>
          <li>Order #3</li>
        </ul>
      </div>
    </div>
  );
}

export default PersonalCabinet;
