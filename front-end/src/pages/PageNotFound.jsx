import React from "react";
import error404 from "../assets/ERROR IMAGE/Error.svg";

const PageNotFound = () => {
  return (
    <section className="page-not-found">
      <h1>Page Not Found!</h1>
      <img src={error404} alt="" />
    </section>
  );
};

export default PageNotFound;
