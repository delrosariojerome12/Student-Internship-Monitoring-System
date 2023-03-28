/** @format */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
const InternsDetail = React.memo(() => {
  const {
    user: {
      email,
      internshipDetails: { renderedHours },
      scheduleDetails: { scheduleType },
      schoolDetails: {
        studentContact,
        studentNumber,
        requiredHours,
        validID: { link, name },
      },
      status,
      verification: { isVerified },
    },
  } = useSelector((state) => state.user);

  return (
    <div className="intern-details-container">
      <div className="intern-content">
        <p>
          <b> Status: </b>{" "}
          {status === "Starting" ? "Undergoing Internship" : "Not Started"}
        </p>
        <p>
          <b>Total Rendered Hours: </b> {renderedHours}hrs
        </p>
        <p>
          <b>Schedule Type: </b> {scheduleType}
        </p>
        <p>
          <b>Student Number: </b> {studentNumber}
        </p>
        <p>
          <b>Student Email: </b> {email}
        </p>
        <p>
          <b>Student Contact: </b>
          {studentContact}
        </p>
      </div>
    </div>
  );
});

export default InternsDetail;
