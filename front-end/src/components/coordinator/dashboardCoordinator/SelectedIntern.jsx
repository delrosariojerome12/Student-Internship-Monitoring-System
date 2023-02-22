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
          Student:
          <b> {`${firstName} ${lastName}`}</b>
        </p>
        <p>
          Program:
          <b> {program}</b>
        </p>
        <p>
          Total Hours:
          <b> {`${renderedHours}/${requiredHours}`}</b>
        </p>
      </div>
      <div className="right-con">
        <p>
          Internship:
          <b> {companyName} </b>
        </p>
        <p>
          Address:
          <b> {companyAddress} </b>
        </p>
        <p>
          Work:
          <b> {typeOfWork}</b>
        </p>
      </div>
    </div>
  );
};

export default SelectedIntern;
