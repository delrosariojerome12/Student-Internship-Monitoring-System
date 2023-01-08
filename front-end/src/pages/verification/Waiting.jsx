import React from "react";
import waitingImg from "../../assets/img/verification/waiting.svg";
import {useNavigate} from "react-router";

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
      <h3>Your Request for approval has been rejected.</h3>
      {remarks ? (
        <p>{remarks}</p>
      ) : (
        <p>Coordinator has not speficied the reason of disapproval.</p>
      )}
      <div className="sent-details">
        <div className="student-details">
          <h3>Student Details</h3>
          <p>Program: {program}</p>
          <p>Required Hours: {requiredHours}</p>
          <p>Contact: {studentContact}</p>
          <p>Email: {email}</p>
          <img src={link} id="valid-id" alt="student image" />
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

      <button onClick={() => navigate("/dashboard/verification")}>
        Resubmit Request
      </button>
    </section>
  );
});

export default Waiting;
