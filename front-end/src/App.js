import React, {useEffect} from "react";
// pages
import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/dashboard/dashboard";
import PageNotFound from "./pages/PageNotFound";

// component
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";

import {Routes, Route, Navigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setUser} from "./features/user/userReducer";
import {getUserOnLoad} from "./features/user/userReducer";
import jwt_decode from "jwt-decode";

const App = () => {
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // sets state of user from token
  useEffect(() => {
    if (!user && localStorage.getItem("token")) {
      const {name, email} = jwt_decode(localStorage.getItem("token"));
      dispatch(getUserOnLoad(email));
    }
  }, []);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  console.log(user);

  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {!user ? (
          <>
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/signup" element={<Signup />} />
          </>
        ) : (
          <>
            <Route
              path="/account/login"
              element={<Navigate to={"/dashboard"} replace />}
            />
            <Route
              path="/account/signup"
              element={<Navigate to={"/dashboard"} replace />}
            />
          </>
        )}
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
};

export default App;
