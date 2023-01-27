import React from "react";
import error500 from "../assets/ERROR IMAGE/ServerError.svg";
import {useNavigate} from "react-router-dom";

const ServerError = () => {
  const navigate = useNavigate();
  return (
    <section className="server-error">
      <img src={error500} alt="" />
      <h1>Oh no, Something went wrong!</h1>
      <button onClick={() => navigate("/")}>Go back to home page</button>
    </section>
  );
};

export default ServerError;
