import React, {useEffect, useState} from "react";
// import searchIcon from "../../assets/img/search.svg";
import {useSelector, useDispatch} from "react-redux";
import {BiSearchAlt} from "react-icons/bi";
import {checkStartingDate} from "../../features/interns/attendanceReducer";
import {useNavigate} from "react-router";
import ReactMap from "../../components/utils/ReactMap";

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
    const date = new Date();
    const day = date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const year = date.getFullYear();
    const today = `${year}-${month}-${day}`;
    const startDate = new Date(startingDate);

    console.log(date);
    console.log(startDate);

    // if (today === startingDate && status !== "Starting") {
    //   dispatch(checkStartingDate({email}));
    // }
    if (today >= startingDate && status !== "Starting") {
      dispatch(checkStartingDate({email}));
    }
  }, []);

  const renderDocuments = () => {
    if (documentDetails.length === 0) {
      return <h3>Please Reload, it may take some time.</h3>;
    }
    return documentDetails.map((item, index) => {
      const {
        document: {name, format},
        completion: {isApproved, hasSent, isRejected},
      } = item;
      return (
        <div className="document-dashboard" key={index}>
          <h4>{name}</h4>
          <p>{format}</p>
          <h4
            style={{
              color: isApproved
                ? "#00adb5"
                : hasSent
                ? "#fff"
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
            <div className="btn-controller">
              <button onClick={() => navigate("/dashboard/daily-time-record")}>
                Daily Time Record
              </button>
            </div>
            <div className="text">
              <h3>{`Rendered Hours: ${renderedHours}hrs/${requiredHours}hrs`}</h3>
              {DaysNeeded(renderedHours, requiredHours)}
            </div>
          </div>
        </div>
        <div className="documents">
          <h4>Documents</h4>
          <div className="document-contents">
            {renderDocuments()}
            {documentDetails.length > 0 && (
              <button onClick={() => navigate("/dashboard/documents")}>
                Manage Documents
              </button>
            )}
          </div>
        </div>
        <div className="internship-details">
          <h4>Intership Details</h4>
          <div className="internship-contents">
            <h4>Internship at {companyName}</h4>
            <h4>Type of Work: {typeOfWork}</h4>
            <h4>Supervisor: {supervisor}</h4>
            <h4>Contact: {supervisorContact}</h4>
            <h4>Email: {supEmail}</h4>
          </div>
        </div>
        {isMapOpen && (
          <>
            <div className="overlay"></div>
            <div className="map-con">
              <h3>Click the map to test location.</h3>
              <ReactMap />
              <button onClick={() => setMapOpen(false)}>Close Map</button>
            </div>
          </>
        )}

        <div className="map">
          <button onClick={() => setMapOpen(true)}>View Map</button>
        </div>
      </div>
    </section>
  );
});

export default DashboardMain;
