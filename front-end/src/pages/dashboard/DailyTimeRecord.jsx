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
import AttendanceModal from "../../components/intern/AttendanceModal";
import CantStart from "./CantStart";

import {getAllAttendance} from "../../features/interns/attendanceReducer";
import NoDocumentSvg from "../../assets/img/waiting.svg";

import {
  handleTimeIn,
  handleTimeOut,
  handleViewToday,
  handleDisableTimeIn,
  handleDisableTimeOut,
  checkStartingDate,
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
    isTimeInDisable,
    isTimeOutDisable,
    alreadyTimeIn,
    alreadyTimeOut,
    canStart,
    todayAttendanceID,
  } = useSelector((state) => state.attendance);
  const dispatch = useDispatch();

  const {
    user: {firstName, lastName, profileImage, email},
    internshipDetails: {renderedHours, startingDate},
    schoolDetails: {program, requiredHours},
    scheduleDetails,
    status,
  } = user;

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes();
      const amOrPm = now.getHours() >= 12 ? "PM" : "AM";

      // if (hours >= 8 && hours <= 10 && amOrPm === "AM") {
      //   dispatch(handleDisableTimeIn(false));
      // } else if (hours >= 1 && amOrPm === "PM") {
      //   dispatch(handleDisableTimeIn(false));
      // }

      // if (hours >= 8 && hours <= 10 && amOrPm === "AM") {
      //   dispatch(handleDisableTimeIn(false));
      // } else if (hours === 1 && minutes < 29 && amOrPm === "PM") {
      //   dispatch(handleDisableTimeIn(false));
      // } else if (alreadyTimeIn) {
      //   if (hours >= 5 && hours <= 7 && amOrPm === "PM") {
      //     dispatch(handleDisableTimeOut(false));
      //   }
      // }
    }, 1000);

    const date = new Date();
    const day = date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const year = date.getFullYear();
    const today = `${year}-${month}-${day}`;

    dispatch(getAllAttendance({email, scheduleDetails}));

    today === startingDate && dispatch(checkStartingDate({email}));
    return () => clearInterval(timer);
  }, []);

  if (isLoading || !allAttendance) {
    return <Bouncing />;
  }

  if (isError) {
    return <ServerError />;
  }

  if (status === "Not Started") {
    return <CantStart startingDate={startingDate} />;
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
            <div className="text">
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
          </div>
          <div className="mid">
            <div className="button-container">
              <button
                className="time-in"
                onClick={() => dispatch(handleTimeIn())}
                // style={
                //   isTimeInDisable
                //     ? {pointerEvents: "none", opacity: ".5"}
                //     : {opacity: "1"}
                // }
              >
                Time In
              </button>
              <button
                className="time-out"
                onClick={() => dispatch(handleTimeOut())}
                // style={
                //   isTimeOutDisable
                //     ? {pointerEvents: "none", opacity: ".5"}
                //     : {opacity: "1"}
                // }
              >
                Time Out
              </button>
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
        {isTodayOpen && <AttendanceModal />}
      </section>
    </IconContext.Provider>
  );
});

export default DailyTimeRecord;
