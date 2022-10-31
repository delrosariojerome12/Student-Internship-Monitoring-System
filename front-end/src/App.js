import React from "react";
// pages
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";

// component
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import {Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  );
};

export default App;
