import React, {useState} from "react";
import {FaAngleDoubleDown} from "react-icons/fa";
import {IoMdNotifications} from "react-icons/io";

const ApprovalIntern = React.memo(({intern}) => {
  const {
    user: {firstName, lastName},
    schoolDetails: {program},
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
              <p>Company: {companyName}</p>
              <p>Address: {companyAddress}</p>
              <p>Supervisor: {supervisor}</p>
              <p>Contact: {supervisorContact}</p>
              <p>Type of Work: {typeOfWork}</p>

              <p>Schedule Type: {scheduleType}</p>
              <p>Days: {scheduledDays} </p>
              <p>Time: {`${timeInSchedule} - ${timeOutSchedule}`}</p>
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
