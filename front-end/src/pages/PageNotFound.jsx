import React from "react";
import error404 from "../assets/ERROR IMAGE/Error.svg";
import {useNavigate} from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="page-not-found">
      <img src={error404} alt="" />
      <h1>
        The page that were you looking for doesn’t <b>"exist"</b>
      </h1>
      <button onClick={() => navigate("/")}>Go back to home page</button>
    </section>
  );
};

export default PageNotFound;
