/** @format */

import React from "react";
import waitingImg from "../../assets/img/verification/waiting.svg";
import { useNavigate } from "react-router";
import { IconContext } from "react-icons";
import { FaChevronDown } from "react-icons/fa";
import RejectErrorSvg from "../../assets/ERROR IMAGE/RejectError.svg";
const Waiting = React.memo((user) => {
  const {
    user: {
      user: { firstName, lastName, email },
      schoolDetails: {
        program,
        studentContact,
        validID: { link },
        requiredHours,
      },
      internshipDetails: {
        companyAddress,
        companyName,
        supervisor,
        supervisorContact,
        typeOfWork,
        logo,
        startingDate,
        description,
      },
      scheduleDetails: {
        scheduleType,
        scheduledDays,
        timeInSchedule,
        timeOutSchedule,
      },
      verification: { isRejected, remarks, hasSentVerification },
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
      <IconContext.Provider value={{ className: "icons" }}>
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
              <h6>{remarks}</h6>
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
                <b>
                  {firstName} {lastName}
                </b>
              </p>
              <p>
                Program:
                <b> {program}</b>
              </p>
              <p>
                Required Hours:
                <b> {requiredHours}</b>
              </p>
              <p>
                Email:
                <b> {email}</b>
              </p>
              <p>
                Contact Number:
                <b> {studentContact}</b>
              </p>
            </div>
          </div>
          <div className="schedule-details-container">
            <h4>Schedule Details</h4>
            <p>
              Schedule Type:
              <b> {scheduleType}</b>
            </p>
            <p>
              Days:
              <b> {scheduledDays}</b>
            </p>
            <p>
              Time:
              <b> {`${timeInSchedule} - ${timeOutSchedule}`}</b>
            </p>
            <p>
              Starting Date:
              <b> {startingDate}</b>
            </p>
          </div>
          <div className="internship-details-container">
            <h4>Internship Details</h4>
            <img src={logo.link} alt={logo.name} />
            <p>
              Company:
              <b> {companyName}</b>
            </p>
            <p>
              Address:
              <b> {companyAddress}</b>
            </p>
            <p>
              Supervisor:
              <b> {supervisor}</b>
            </p>
            <p>
              Email:
              {/* Internship Details Email */}
            </p>
            <p>
              Contact:
              <b> {supervisorContact}</b>
            </p>
            <p>
              Type of Work:
              <b> {typeOfWork}</b>
            </p>
            <p>
              Description:
              <b> {description}</b>
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
