import React from "react";
// pages
import Home from "./pages/home";
// component
import Login from "./components/auth/login";
import Signin from "./components/auth/signin";
import {Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/signin" element={<Signin />} />
      </Routes>
    </main>
  );
};

export default App;
