import React from "react";
import {useSelector} from "react-redux";

const SelectedIntern = () => {
  const {selectedIntern} = useSelector((state) => state.intern);

  const {
    user: {email, firstName, lastName, profileImage},
    internshipDetails: {
      companyAddress,
      companyName,
      renderedHours,
      supervisor,
      typeOfWork,
    },
    schoolDetails: {requiredHours, program, studentContact},
    scheduleDetails: {scheduleType, timeInSchedule, timeOutSchedule},
  } = selectedIntern;
  return (
    <div className="selected-intern">
      <img src={profileImage} alt="profile-intern" />
      <div className="middle-con">
        <p>Student: {`${firstName} ${lastName}`}</p>
        <p>Program: {program}</p>
        <p>{`Total Hours: ${renderedHours}/${requiredHours}`}</p>
      </div>
      <div className="right-con">
        <p>Internship: {companyName}</p>
        <p>Address: {companyAddress}</p>
        <p>Work: {typeOfWork}</p>
      </div>
    </div>
  );
};

export default SelectedIntern;
