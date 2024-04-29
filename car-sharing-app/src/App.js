import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import Main from "./Main";
import PersonalCabinet from "./Personal";

function App() {
  const handleLogin = () => {
    console.log("User logged in");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Main />} />
        <Route path="/personal" element={<PersonalCabinet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
