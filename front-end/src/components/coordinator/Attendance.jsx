/** @format */

import React from "react";

const Attendance = React.memo(({ attendance }) => {
  const {
    user: { firstName, lastName, profileImage },
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
      scheduleDetails: { scheduleType },
    },
    timeIn,
    timeOut,
    totalRendered,
    isLate,
    isPresent,
    locationTimeIn,
    locationTimeOut,
  } = attendance;

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

  // const updatedLocation = location.indexOf("NE:");
  // const finalLocation = location.substring(0, updatedLocation).trim();

  return (
    <div className="day-attendance">
      <div className="left">
        <img src={profileImage} alt="profile" />
      </div>
      <div className="right">
        <div className="first">
          <h4>{`${firstName} ${lastName}`}</h4>
          <p>
            <b>Time in: </b>
            {timeIn}
          </p>
          <p>
            <b>Time out:</b> {timeOut}
          </p>
          <p>
            <b>Total Rendered:</b> {totalRendered}hrs
          </p>
          {/* <h3>{scheduleType}</h3> */}
        </div>
        <div className="second">
          <h4>{companyName}</h4>
          {/* <p>{finalLocation}</p> */}
        </div>
      </div>
    </div>
  );
});

export default Attendance;
