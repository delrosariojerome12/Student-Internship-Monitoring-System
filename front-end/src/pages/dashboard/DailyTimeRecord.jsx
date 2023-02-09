import React from "react";
import { useSelector } from "react-redux";
import { FaCheck, FaCamera, FaRegImage } from "react-icons/fa";
import { IconContext } from "react-icons";
import { BiSearchAlt } from "react-icons/bi";

const DailyTimeRecord = () => {
  const {
    user: {
      user: { firstName, lastName, profileImage },
      internshipDetails: { renderedHours },
      schoolDetails: { program, requiredHours },
    },
  } = useSelector((state) => state.user);

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
        <div className="content">
          <div className="user">
            <div className="profile-img">
              <img src={profileImage} alt="profile-image" />
            </div>
            <h4 className="full-name">
              {firstName} {lastName}
            </h4>
            <p className="rendered-hours">
              <b>Rendered Hours: </b> {renderedHours}
            </p>
            <p className="required-hours">
              <b>Required Hours: </b> {requiredHours}
            </p>
            <p className="program">
              <b>Program:</b> {program}
            </p>
          </div>
          <div className="mid">
            <div className="button-container">
              <button className="time-in">Time In</button>
              <button className="time-out">Time Out</button>
              {/* <button className="all-records">All Records</button>
              <button className="view-as-pdf">View As PDF</button> */}
            </div>
            <div className="search-box">
              <span>
                <BiSearchAlt />
              </span>
              <input type="text" placeholder="Search" />
            </div>
          </div>
          <div className="DTR-content">
            <div>Day 1</div>
            <div>Day 2</div>
            <div>Day 3</div>
            <div>Day 4</div>
            <div>Day 5</div>
          </div>
        </div>
      </section>
    </IconContext.Provider>
  );
};

export default DailyTimeRecord;
