import React from "react";
import waitingImg from "../../assets/img/verification/waiting.svg";
import {useNavigate} from "react-router";
import {IconContext} from "react-icons";
import {FaChevronDown} from "react-icons/fa";
import RejectErrorSvg from "../../assets/ERROR IMAGE/RejectError.svg";
const Waiting = React.memo((user) => {
  const {
    user: {
      email,
      schoolDetails: {
        program,
        studentContact,
        validID: {link},
        requiredHours,
      },
      internshipDetails: {
        companyAddress,
        companyName,
        supervisor,
        supervisorContact,
        typeOfWork,
      },
      scheduleDetails: {
        scheduleType,
        scheduledDays,
        timeInSchedule,
        timeOutSchedule,
      },
      verification: {isRejected, remarks, hasSentVerification},
    },
  } = user;

  const navigate = useNavigate();

  if (!isRejected) {
    return (
      <section className="waiting-container-sent">
        <h3>You have sent your verification request.</h3>
        <p>Please Wait for the admin approval.</p>
        <div className="img-container">
          <img src={waitingImg} alt="waiting.img" />
        </div>
      </section>
    );
  }

  return (
    <div className="waiting-container-pending">
      <IconContext.Provider value={{className: "icons"}}>
        <header>
          <div className="text">
            <h3>Your request for approval has been rejected.</h3>
            <p>
              To know more how to get immdiate approval please follow the
              remarks.
            </p>
          </div>
          <div className="remarks-container">
            <h5>Remarks:</h5>
            <div className="remarks">
              <img src={RejectErrorSvg} alt="" />
              <p>{remarks}</p>
            </div>
          </div>
        </header>
        <div className="sent-details">
          <div className="img-container">
            <img src={link} alt="" />
          </div>

          <div className="student-details-container">
            <div className="student-details">
              <h4>Student Details</h4>
              <p>
                <b>Program: </b>
                {program}
              </p>
              <p>
                <b>Required Hours: </b>
                {requiredHours}
              </p>
              <p>
                <b>Email: </b>
                {email}
              </p>
              <p>
                <b>Contact Number: </b>
                {studentContact}
              </p>
            </div>
          </div>
          <div className="schedule-details-container">
            <h4>Schedule Details</h4>
            <p>
              <b>Schedule Type: </b>
              {scheduleType}
            </p>
            <p>
              <b>Days: </b>
              {scheduledDays}
            </p>
            <p>
              <b>Time: </b>
              {`${timeInSchedule} - ${timeOutSchedule}`}
            </p>
          </div>
          <div className="internship-details-container">
            <h4>Internship Details</h4>
            <p>
              <b>Type of Work: </b>
              {typeOfWork}
            </p>
            <p>
              <b>Company: </b>
              {companyName}
            </p>
            <p>
              <b>Address: </b>
              {companyAddress}
            </p>
            <p>
              <b>Supervisor: </b>
              {supervisor}
            </p>
            <p>
              <b>Contact: </b>
              {supervisorContact}
            </p>
          </div>
        </div>
        <button onClick={() => navigate("/dashboard/verification")}>
          Resubmit
        </button>
      </IconContext.Provider>
    </div>
  );
});

export default Waiting;
