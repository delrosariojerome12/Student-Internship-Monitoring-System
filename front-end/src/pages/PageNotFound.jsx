import React from "react";
import error404 from "../assets/ERROR IMAGE/Error.svg";

const PageNotFound = () => {
  return (
    <section className="page-not-found">
      <img src={error404} alt="" />
      <h1>
        The page that were you looking for doesn’t <b>"exist"</b>
      </h1>
      <button>Go back to home page</button>
    </section>
  );
};

export default PageNotFound;
