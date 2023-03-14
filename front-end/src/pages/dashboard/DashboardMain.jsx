import React, {useEffect} from "react";
import searchIcon from "../../assets/img/search.svg";
import {useSelector, useDispatch} from "react-redux";

import {BiSearchAlt} from "react-icons/bi";
import {checkStartingDate} from "../../features/interns/attendanceReducer";

const DashboardMain = () => {
  const {
    user: {
      user: {firstName},
      email,
      internshipDetails: {renderedHours, startingDate},
      status,
    },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const date = new Date();
    const day = date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const year = date.getFullYear();
    const today = `${year}-${month}-${day}`;

    if (today === startingDate && status !== "Starting") {
      dispatch(checkStartingDate({email}));
    }
  }, []);

  return (
    <section className="main">
      <header>
        <div className="name-container">
          <h1 className="name">Hello, {firstName}</h1>
          <h4>Welcome Back!</h4>
        </div>
        <div className="search-box">
          <span>
            <BiSearchAlt />
          </span>
          <input placeholder="Search" type="text" />
        </div>
      </header>
      <div className="content">
        <div className="time-keeper">
          <h4>Time Keeper</h4>
          <div className="time-keeper-contents">
            {/* <p>{`Rendered Hours: ${renderedHours}/${requiredHours}`}</p> */}
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
            {/* <p>
              <b> Company:</b> {companyName}
            </p>
            <p>
              <b> Address: </b>
              {companyAddress}
            </p>
            <p>
              <b> Supervisor: </b>
              {supervisor}
            </p>
            <p>
              <b> Contact No.: </b>
              {supervisorContact}
            </p> */}
          </div>
        </div>
        <div className="map">
          <p>Maps</p>
        </div>
      </div>
    </section>
  );
};

export default DashboardMain;
