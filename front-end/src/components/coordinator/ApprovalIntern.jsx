import React, {useState} from "react";
import {FaCheck, FaTrash} from "react-icons/fa";

const ApprovalIntern = React.memo(({intern}) => {
  const {
    user: {firstName, lastName},
    schoolDetails: {program, studentContact, validID, requiredHours},
    internshipDetails: {
      companyAddress,
      companyName,
      supervisor,
      supervisorContact,
      typeOfWork,
    },
    verification: {isVerified, hasSentVerification},
    scheduleDetails: {
      scheduleType,
      scheduledDays,
      timeInSchedule,
      timeOutSchedule,
    },
  } = intern;

  console.log(intern);
  const [isDetailsOpen, setDetailsOpen] = useState(false);

  const handleDetails = () => {
    setDetailsOpen(!isDetailsOpen);
  };

  return (
    <div className="approval-intern">
      {isDetailsOpen && (
        <div className="overlay">
          <div className="intern-modal">
            <div className="sent-details">
              <div className="student-details">
                <h3>Student Details</h3>
                <p>Program: {program}</p>
                <p>Required Hours: {requiredHours}</p>
                <p>Contact: {studentContact}</p>
                <img src={validID} id="valid-id" alt="student image" />
              </div>

              <div className="internship-details">
                <h3>Internship Details</h3>
                <p>Company: {companyName}</p>
                <p>Address: {companyAddress}</p>
                <p>Supervisor: {supervisor}</p>
                <p>Contact: {supervisorContact}</p>
                <p>Type of Work: {typeOfWork}</p>
              </div>

              <div className="schedule-details">
                <h3>Schedule Details</h3>
                <p>Schedule Type: {scheduleType}</p>
                <p>Days: {scheduledDays} </p>
                <p>Time: {`${timeInSchedule} - ${timeOutSchedule}`}</p>
              </div>
            </div>
            <div className="btn-container">
              <button onClick={handleDetails}>Back</button>
              <button>Decline</button>
              <button>Approve</button>
            </div>
          </div>
        </div>
      )}
      <div className="intern-left">
        <img src="" alt="" />
      </div>
      <div className="intern-right">
        <div className="intern-details">
          <p>
            {firstName} {lastName}
          </p>
          <p>{program}</p>
        </div>
        <button onClick={handleDetails}>View Sent Details</button>
      </div>
    </div>
  );
});

export default ApprovalIntern;
