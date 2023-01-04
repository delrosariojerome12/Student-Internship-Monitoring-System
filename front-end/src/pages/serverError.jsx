import React from "react";
import error500 from "../assets/ERROR IMAGE/ServerError.svg";

const ServerError = () => {
  return (
    <section className="server-error">
      <img src={error500} alt="" />
      <h1>Oh no, Something went wrong!</h1>
      <button>Go back to home page</button>
    </section>
  );
};

export default ServerError;
