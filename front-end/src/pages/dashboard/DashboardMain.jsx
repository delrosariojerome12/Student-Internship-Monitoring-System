import React from "react";

const DashboardMain = () => {
  return (
    <section className="main">
      <header>
        <h2 className="name"></h2>
        <h4>Welcome Back!</h4>
      </header>
      <div className="content">
        <div className="time-keeper"></div>
        <div className="documents"></div>
        <div className="internship-details"></div>
        <div className="map"></div>
      </div>
    </section>
  );
};

export default DashboardMain;
