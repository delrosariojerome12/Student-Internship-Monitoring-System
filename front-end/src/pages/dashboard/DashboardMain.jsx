/** @format */

import React, {useEffect, useState} from "react";
// import searchIcon from "../../assets/img/search.svg";
import {useSelector, useDispatch} from "react-redux";
import {BiSearchAlt} from "react-icons/bi";
import {checkStartingDate} from "../../features/interns/attendanceReducer";
import {useNavigate} from "react-router";
import ReactMap from "../../components/utils/ReactMap";
import NoInternship from "../../assets/img/no-internship.svg";

const DashboardMain = React.memo(() => {
  const {
    user: {
      user: {firstName},
      email,
      internshipDetails: {
        renderedHours,
        startingDate,
        companyName,
        typeOfWork,
        supervisor,
        supervisorContact,
        email: supEmail,
      },
      schoolDetails: {requiredHours},
      documentDetails,
      status,
    },
  } = useSelector((state) => state.user);

  const [isMapOpen, setMapOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // if (status !== "Starting") {
    dispatch(checkStartingDate({email}));
    // }
  }, []);

  const renderDocuments = () => {
    if (documentDetails.length === 0) {
      return (
        <div className="no-content">
          <h3>No Reports found.</h3>
          <h3>Please Reload, it may take some time.</h3>
          <img src={NoInternship} alt="waiting" />
        </div>
      );
    }
    return documentDetails.map((item, index) => {
      const {
        document: {name, format},
        completion: {isApproved, hasSent, isRejected},
      } = item;
      return (
        <div className="document-dashboard" key={index}>
          <h4>
            {name}.{format}
          </h4>
          {/* <p className="format">{format}</p> */}
          <h4
            className="status"
            style={{
              color: isApproved
                ? "#00adb5"
                : hasSent
                ? "#323232"
                : isRejected
                ? "#e63946"
                : "#F18805",
            }}
          >
            {isApproved
              ? "Approved"
              : hasSent
              ? "Sent"
              : isRejected
              ? "Rejected"
              : "Missing"}
          </h4>
        </div>
      );
    });
  };

  const DaysNeeded = (rendered, required) => {
    const hoursDifference = required - rendered;

    if (hoursDifference <= 0) {
      return <p>You have already completed the required hours!</p>;
    }

    const daysNeeded = Math.ceil(hoursDifference / 8);

    return (
      <p>
        You need {daysNeeded} more day(s) to complete the required hours of{" "}
        {required} hours.
      </p>
    );
  };

  return (
    <section className="main">
      <header>
        <div className="name-container">
          <h1 className="name">
            Hello, <b>{firstName}</b>
          </h1>
          <h4>Welcome Back!</h4>
        </div>
        {/* <div className="search-box">
          <span>
            <BiSearchAlt />
          </span>
          <input placeholder="Search" type="text" />
        </div> */}
      </header>
      <div className="content">
        <div className="time-keeper">
          <h4>Time Keeper</h4>
          <div className="time-keeper-contents">
            <div className="text">
              <h3>{`Rendered Hours: ${renderedHours}hrs/${requiredHours}hrs`}</h3>
              {DaysNeeded(renderedHours, requiredHours)}
            </div>
            <div className="btn-controller">
              <button onClick={() => navigate("/dashboard/daily-time-record")}>
                Daily Time Record
              </button>
            </div>
          </div>
        </div>
        <div className="documents">
          <h4>Documents</h4>
          <div className="document-contents">
            <div className="btn-documents">
              {documentDetails.length > 0 && (
                <button onClick={() => navigate("/dashboard/documents")}>
                  Manage Documents
                </button>
              )}
            </div>
            {renderDocuments()}
          </div>
        </div>
        <div className="internship-details">
          <h4>Intership Details</h4>
          <div className="internship-contents">
            <p>
              <b>Internship at: </b> {companyName}
            </p>
            <p>
              <b>Type of Work: </b> {typeOfWork}
            </p>
            <p>
              <b>Supervisor: </b> {supervisor}
            </p>
            <p>
              <b>Contact: </b> {supervisorContact}
            </p>
            <p>
              <b>Email: </b> {supEmail}
            </p>
          </div>
        </div>
        {isMapOpen && (
          <>
            <div className="overlay"></div>
            <div className="map-con">
              <h3>Click the map to test and see your location.</h3>
              <ReactMap />
              <div className="btn-close">
                <button onClick={() => setMapOpen(false)}>Close Map</button>
              </div>
            </div>
          </>
        )}
        <div className="map">
          <h4>Maps</h4>
          <div className="btn-map">
            <button onClick={() => setMapOpen(true)}>View Map</button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default DashboardMain;
