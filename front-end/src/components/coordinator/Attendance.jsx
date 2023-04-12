/** @format */

import React from "react";
import {useDispatch} from "react-redux";
import {
  handleSelectIntern,
  handleViewNarrative,
} from "../../features/coordinator/monitorAttendance";

const Attendance = React.memo(({attendance}) => {
  const {
    user: {firstName, lastName, profileImage},
    intern: {
      internshipDetails: {
        companyAddress,
        companyName,
        supervisor,
        supervisorContact,
        typeOfWork,
        logo,
        renderedHours,
      },
      scheduleDetails: {scheduleType},
    },
    timeIn,
    timeOut,
    totalRendered,
    isLate,
    isPresent,
    locationTimeIn,
    locationTimeOut,
    narrative: {isComplete},
    missingTimeOut,
  } = attendance;

  const dispatch = useDispatch();

  if (missingTimeOut) {
    return (
      <div className="day-attendance">
        <div className="left">
          <img src={profileImage} alt="profile" />
        </div>
        <div className="right">
          <div className="first">
            <h4>{`${firstName} ${lastName}`}</h4>
            <p>
              <b>Status:</b> Absent/Missing TimeOut
            </p>
            <h4>{scheduleType}</h4>
          </div>
          <div className="second">
            <h4>{companyName}</h4>

            <div className="more-details-btn">
              <button onClick={() => dispatch(handleSelectIntern(attendance))}>
                View More Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isPresent) {
    return (
      <div className="day-attendance">
        <div className="left">
          <img src={profileImage} alt="profile" />
        </div>
        <div className="right">
          <div className="first">
            <h4>{`${firstName} ${lastName}`}</h4>
            <p>
              <b>Status:</b> Absent
            </p>
            <h4>{scheduleType}</h4>
          </div>
          <div className="second">
            <h4>{companyName}</h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="day-attendance">
      <div className="left">
        <img src={profileImage} alt="profile" />
      </div>
      <div className="right">
        <div className="first">
          <h4>{`${firstName} ${lastName}`}</h4>
          <p className="timeIn">
            <b>Time in: </b>
            {timeIn}
          </p>
          <p className="timeOut">
            <b>Time out:</b> {timeOut}
          </p>
          <p className="rendered">
            <b>Total Rendered:</b> {totalRendered}hrs
          </p>
        </div>
        <div className="second">
          <h4>{companyName}</h4>

          <div className="more-details-btn">
            <button onClick={() => dispatch(handleSelectIntern(attendance))}>
              View More Details
            </button>
            {isComplete ? (
              <button onClick={() => dispatch(handleViewNarrative(attendance))}>
                View Narrative
              </button>
            ) : (
              <h4>No Narrative Yet</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Attendance;
