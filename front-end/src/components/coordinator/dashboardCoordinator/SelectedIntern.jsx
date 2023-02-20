/** @format */

import React from "react";
import { useSelector } from "react-redux";

const SelectedIntern = () => {
  const { selectedIntern } = useSelector((state) => state.intern);

  const {
    user: { email, firstName, lastName, profileImage },
    internshipDetails: {
      companyAddress,
      companyName,
      renderedHours,
      supervisor,
      typeOfWork,
    },
    schoolDetails: { requiredHours, program, studentContact },
    scheduleDetails: { scheduleType, timeInSchedule, timeOutSchedule },
  } = selectedIntern;
  return (
    <div className="selected-intern">
      <img src={profileImage} alt="profile-intern" />
      <div className="middle-con">
        <p>
          <b>Student: </b> {`${firstName} ${lastName}`}
        </p>
        <p>
          <b>Program: </b> {program}
        </p>
        <p>
          <b>Total Hours: </b>
          {`${renderedHours}/${requiredHours}`}
        </p>
      </div>
      <div className="right-con">
        <p>
          <b>Internship: </b> {companyName}
        </p>
        <p>
          <b>Address: </b> {companyAddress}
        </p>
        <p>
          <b>Work: </b> {typeOfWork}
        </p>
      </div>
    </div>
  );
};

export default SelectedIntern;
