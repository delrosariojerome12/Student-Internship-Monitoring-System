import React from "react";

const Bouncing = () => {
  return (
    <section class="bouncing">
      <div class="container">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
      </div>
      <span>loading...</span>
    </section>
  );
};

export default Bouncing;
