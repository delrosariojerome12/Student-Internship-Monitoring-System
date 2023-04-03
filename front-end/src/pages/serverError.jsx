import React from "react";
import error500 from "../assets/ERROR IMAGE/ServerError.svg";
import {useNavigate} from "react-router-dom";

const ServerError = () => {
  const navigate = useNavigate();
  return (
    <section className="server-error">
      <img src={error500} alt="" />
      <h1>Oh no, Something went wrong!</h1>
      {/* <h1>We are just using free services and APIs</h1> */}
      <h1>Reloading helps, it may take few tries.</h1>
      <h1>
        {`(We are only using free APIs and web services please be considerate. Thank you.)`}
      </h1>

      <button onClick={() => navigate("/dashboard")}>
        Go back to home page
      </button>
    </section>
  );
};

export default ServerError;
