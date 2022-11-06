import React from "react";
import searchIcon from "../../assets/img/search.svg";

const DailyTimeRecord = () => {
  return (
    <section className="daily-time-record">
      <header>
        <div className="name-container">
          <h1 className="name">Hello, Hakdog</h1>
          <h4>Welcome Back!</h4>
        </div>
        <div class="search-box">
          <img src={searchIcon} alt="" />
          <input type="text" placeholder="Search" />
        </div>
      </header>
      <div className="content">
        <div className="user">
          <img src={searchIcon} alt="" />
          <div className="infos">
            <p>Giga hakdog</p>
            <p>Started: August 18</p>
            <p>Ended: Unknown</p>
            <p>Estimated Completion: 2 Months</p>
          </div>
        </div>
        <div className="button-container">
          <button>Time In</button>
          <button>Time Out</button>
          <button>All Records</button>
          <button>View As PDF</button>
        </div>
        <div className="table"></div>
      </div>
    </section>
  );
};

export default DailyTimeRecord;
