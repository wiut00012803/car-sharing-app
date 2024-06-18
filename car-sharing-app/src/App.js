import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import Main from "./Main";
import PersonalCabinet from "./Personal";

// this is the main app component where we define our routes
function App() {
  // this function will be called when the user logs in
  const handleLogin = () => {
    console.log("user logged in");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* route for the login page */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {/* route for the main page */}
        <Route path="/" element={<Main />} />
        {/* route for the personal cabinet page */}
        <Route path="/personal" element={<PersonalCabinet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
