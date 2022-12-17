import React from "react";
import waitingImg from "../../assets/img/verification/waiting.svg";

const Waiting = () => {
  return (
    <section className="waiting-container">
      <h3>You have sent your verification request.</h3>
      <p>Please Wait for the admin approval.</p>
      <img src={waitingImg} alt="waiting.img" />
    </section>
  );
};

export default Waiting;
