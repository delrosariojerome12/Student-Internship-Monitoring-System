import React from "react";
import img from "../../assets/img/login-bg.svg";

const Signin = () => {
  return (
    <section className="auth-container signin">
      <section className="bg-container"></section>
      <section className="signin card-container">
        <div className="left-card">
          <img src={img} alt="bg.img" />
        </div>
        <div className="right-card"></div>
      </section>
    </section>
  );
};

export default Signin;
