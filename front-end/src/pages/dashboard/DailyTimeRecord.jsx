import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {FaCheck, FaCamera, FaRegImage} from "react-icons/fa";
import {IconContext} from "react-icons";
import {BiSearchAlt} from "react-icons/bi";

import Bouncing from "../../components/loading/Bouncing";
import ServerError from "../serverError";
import Attendance from "../../components/intern/Attendance";
import TimeInModal from "../../components/intern/TimeInModal";
import TimeOutModal from "../../components/intern/TimeOutModal";

import {getAllAttendance} from "../../features/interns/attendanceReducer";
import NoDocumentSvg from "../../assets/img/waiting.svg";

import {
  handleTimeIn,
  handleTimeOut,
  handleViewToday,
} from "../../features/interns/attendanceReducer";

const DailyTimeRecord = React.memo(() => {
  const {user} = useSelector((state) => state.user);
  const {
    isLoading,
    isError,
    selectedAttendance,
    allAttendance,
    isTimeInOpen,
    isTimeOutOpen,
    isTodayOpen,
  } = useSelector((state) => state.attendance);
  const dispatch = useDispatch();

  console.log(allAttendance);

  const {
    user: {firstName, lastName, profileImage, email},
    internshipDetails: {renderedHours},
    schoolDetails: {program, requiredHours},
  } = user;

  useEffect(() => {
    dispatch(getAllAttendance({email}));
  }, []);

  if (isLoading || !allAttendance) {
    return <Bouncing />;
  }
  if (isError) {
    return <ServerError />;
  }

  const renderAttendance = () => {
    if (allAttendance.length === 0) {
      return (
        <div className="no-internship">
          <h3>No record yet</h3>
          <img src={NoDocumentSvg} alt="no-internship" />
        </div>
      );
    }
    return (
      <div className="DTR-content">
        {allAttendance.map((item, index) => {
          return <Attendance key={index} attendance={item} />;
        })}
      </div>
    );
  };

  return (
    <IconContext.Provider value={{className: "icon"}}>
      <section className="daily-time-record">
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
              <button
                className="time-in"
                onClick={() => dispatch(handleTimeIn())}
              >
                Time In
              </button>
              <button
                className="time-out"
                onClick={() => dispatch(handleTimeOut())}
              >
                Time Out
              </button>
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
          {renderAttendance()}
        </div>
        {isTimeInOpen && <TimeInModal email={email} />}
        {isTimeOutOpen && <TimeOutModal email={email} />}
      </section>
    </IconContext.Provider>
  );
});

export default DailyTimeRecord;
