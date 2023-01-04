import React from "react";

const Bouncing = () => {
  return (
    <section className="bouncing">
      <div className="container">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
      <span>loading...</span>
    </section>
  );
};

export default Bouncing;
