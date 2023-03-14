import React from "react";
import {useSelector, useDispatch} from "react-redux";
const InternsDetail = React.memo(() => {
  const {
    user: {
      email,
      internshipDetails: {renderedHours},
      scheduleDetails: {scheduleType},
      schoolDetails: {
        studentContact,
        studentNumber,
        requiredHours,
        validID: {link, name},
      },
      status,
      verification: {isVerified},
    },
  } = useSelector((state) => state.user);

  return (
    <div className="intern-details-container">
      <h3>
        Status:{" "}
        {status === "Starting" ? "Undergoing Internship" : "Not Started"}
      </h3>
      <h3>Total Rendered Hours: {renderedHours}hrs</h3>
      <h3>Schedule Type: {scheduleType}</h3>
      <h3>Student Number: {studentNumber}</h3>
      <h3>Student Email: {email}</h3>
      <h3>Student Contact: {studentContact}</h3>
    </div>
  );
});

export default InternsDetail;
