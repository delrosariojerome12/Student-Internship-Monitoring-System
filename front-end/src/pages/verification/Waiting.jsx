import React from "react";
import waitingImg from "../../assets/img/verification/waiting.svg";
import {useNavigate} from "react-router";
import {BiErrorAlt} from "react-icons/bi";
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
      <section className="waiting-container">
        <h3>You have sent your verification request.</h3>
        <p>Please Wait for the admin approval.</p>
        <div className="img-container">
          <img src={waitingImg} alt="waiting.img" />
        </div>
      </section>
    );
  }

  return (
    <section className="waiting-container">
      <header>
        <div className="left-one">
          <h2>Your Request for approval has been rejected.</h2>
          <p>
            To know more how to get immediate approval follow the guidelines
          </p>
        </div>
        <div className="right-one">
          <div className="right-icons">
            <h4>Remarks:</h4>
            <span>
              <BiErrorAlt />
            </span>
          </div>
          <div className="right-remarks">
            {remarks ? (
              <h4>{remarks}</h4>
            ) : (
              <h4>Coordinator has not speficied the reason of disapproval.</h4>
            )}
          </div>
        </div>
      </header>
      <div className="sent-details">
        <div className="student-details">
          <img src={link} id="valid-id" alt="student image" />

          <div className="more-details">
            <h3>Student Details</h3>
            <p>
              <b>Program: </b> {program}
            </p>
            <p>
              <b>Required Hours: </b> {requiredHours}
            </p>
            <p>
              <b>Contact: </b>
              {studentContact}
            </p>
            <p>
              <b>Email: </b>
              {email}
            </p>
          </div>
          <h3>Student Details</h3>
          <p>Program: {program}</p>
          <p>Required Hours: {requiredHours}</p>
          <p>Contact: {studentContact}</p>
          <p>Email: {email}</p>
          <img src={link} id="valid-id" alt="student image" />
        </div>

        <div className="student-more-details">
          <div className="schedule-details">
            <h3>Schedule Details</h3>
            <div className="shced-paragraph">
              <p>
                <b>Schedule Type:</b> {scheduleType}
              </p>
              <p>
                <b>Days: </b> {scheduledDays}
              </p>
              <p>
                <b>Time:</b> {`${timeInSchedule} - ${timeOutSchedule}`}
              </p>
            </div>
          </div>

          <div className="internship-details">
            <h3>Internship Details</h3>
            <div className="intern-paragraph">
              <p>
                <b>Company:</b> {companyName}
              </p>
              <p>
                <b>Address:</b> {companyAddress}
              </p>
              <p>
                <b>Supervisor:</b> {supervisor}
              </p>
              <p>
                <b>Contact:</b> {supervisorContact}
              </p>
              <p>
                <b>Type of Work:</b> {typeOfWork}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => navigate("/dashboard/verification")}>
        Resubmit Request
      </button>
    </section>
  );
});

export default Waiting;
