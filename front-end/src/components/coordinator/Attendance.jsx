import React from "react";

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
    location,
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
            <h4>Status: Absent</h4>
            <h3>{scheduleType}</h3>
          </div>
          <div className="second">
            <p>{companyName}</p>
          </div>
        </div>
      </div>
    );
  }

  const updatedLocation = location.indexOf("NE:");
  const finalLocation = location.substring(0, updatedLocation).trim();

  return (
    <div className="day-attendance">
      <div className="left">
        <img src={profileImage} alt="profile" />
      </div>
      <div className="right">
        <div className="first">
          <h4>{`${firstName} ${lastName}`}</h4>
          <p>Time in: {timeIn}</p>
          <p>Time out: {timeOut}</p>
          <p>Total Rendered: {totalRendered}hrs</p>
          <h3>{scheduleType}</h3>
        </div>
        <div className="second">
          <p>{companyName}</p>
          <p>{finalLocation}</p>
        </div>
      </div>
    </div>
  );
});

export default Attendance;
