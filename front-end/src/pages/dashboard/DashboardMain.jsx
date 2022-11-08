import React from "react";
import searchIcon from "../../assets/img/search.svg";
const DashboardMain = () => {
  return (
    <section className="main">
      <header>
        <div className="name-container">
          <h1 className="name">Hello, Hakdog</h1>
          <h4>Welcome Back!</h4>
        </div>
        <div className="search-box">
          <img src={searchIcon} alt="" />
          <input type="text" placeholder="Search" />
        </div>
      </header>
      <div className="content">
        <div className="time-keeper">
          <h4>Time Keeper</h4>
          <div className="time-keeper-contents">
            <h3>TIME</h3>
          </div>
        </div>
        <div className="documents">
          <h4>Documents</h4>
          <div className="document-contents">
            <h3>TODO</h3>
          </div>
        </div>
        <div className="internship-details">
          <h4>Intership Details</h4>
          <div className="internship-contents">
            <h5>Motorpool</h5>
            <h6>Mahiwagang Hakdog</h6>
            <h6>666 position</h6>
          </div>
        </div>
        <div className="map"></div>
      </div>
    </section>
  );
};

export default DashboardMain;
