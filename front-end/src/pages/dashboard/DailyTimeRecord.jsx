import React from "react";
import searchIcon from "../../assets/img/search.svg";
import { FaCheck, FaCamera, FaRegImage } from "react-icons/fa";
import { IconContext } from "react-icons";

const DailyTimeRecord = () => {
  return (
    <IconContext.Provider value={{ className: "icon" }}>
      <section className="daily-time-record">
        <div className="time-in-modal">
          <span className="check-icon">
            <FaCheck />
          </span>
          <div className="modals-content">
            <div className="top">
              <span>
                <FaCamera />
              </span>
              <p>Allow camera to take your Check-in</p>
            </div>
            <div className="bottom">
              <button>Check-In</button>
            </div>
          </div>
        </div>
        <div className="time-in-modals2">
          <div className="check-and-message">
            <span>
              <FaCheck />
            </span>
            <p>Thank You!</p>
          </div>
          <div className="modal-details">
            <span>
              <FaRegImage />
            </span>
            <div className="user-infos">
              <p>Checked-In Successfully</p>
              <p>user name</p>
              <p>time</p>
              <p>date</p>
              <p>localtion</p>
              <p>ID number</p>
            </div>
            <button>Return to home</button>
          </div>
        </div>
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
    </IconContext.Provider>
  );
};

export default DailyTimeRecord;
