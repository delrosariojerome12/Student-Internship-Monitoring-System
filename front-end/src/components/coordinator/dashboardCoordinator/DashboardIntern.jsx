/** @format */

import React from "react";

const DashboardIntern = React.memo(({ intern }) => {
  const {
    user: { firstName, lastName, profileImage },
    schoolDetails,
    verification: { isVerified, hasSentVerification },
    internshipDetails,
    scheduleDetails,
  } = intern;

  return (
    <section className="all-interns">
      <div className="img-intern">
        <img src={profileImage} alt="profile-image" />
      </div>
      <div className="intern-detail">
        <h4 className="full-name">
          {firstName} {lastName}
        </h4>
        <h4 className="program">{schoolDetails?.program}</h4>
        <h4 className="course">BSIT</h4>
        <h4 className="schedType">{scheduleDetails?.scheduleType}</h4>
        <p className="rendered">
          Total Hours:
          <b>
            {" "}
            `${internshipDetails?.renderedHours}/${schoolDetails?.requiredHours}
            `}
          </b>
        </p>
      </div>
    </section>
  );
});

export default DashboardIntern;
