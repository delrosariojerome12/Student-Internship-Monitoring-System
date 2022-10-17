import React from "react";
import {useNavigate} from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="home">
      <h1>Home</h1>
      <button onClick={() => navigate("/account/login")}>Log in </button>
      <button onClick={() => navigate("/account/signin")}>Register</button>
    </section>
  );
};

export default Home;
