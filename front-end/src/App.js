import React from "react";
// pages
import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/dashboard/dashboard";
import PageNotFound from "./pages/PageNotFound";

// component
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import {Routes, Route, Outlet} from "react-router-dom";

const App = () => {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/signup" element={<Signup />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Outlet />
    </main>
  );
};

export default App;
