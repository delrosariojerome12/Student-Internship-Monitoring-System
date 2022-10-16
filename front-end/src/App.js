import React from "react";
import Login from "./components/auth/login";
import Signin from "./components/auth/signin";
import {Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/signin" element={<Signin />} />
      </Routes>
    </div>
  );
};

export default App;
