/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIntern } from "../../features/interns/internReducer";
import { FaCheck, FaTrash } from "react-icons/fa";
import { isRejected } from "@reduxjs/toolkit";

const ApprovalIntern = React.memo(({ intern, index }) => {
  // const {selectedIntern} = useSelector((state) => state.intern);
  const dispatch = useDispatch();

  const {
    user: { firstName, lastName, email, profileImage },
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
    verification: { isVerified, hasSentVerification },
    scheduleDetails: {
      scheduleType,
      scheduledDays,
      timeInSchedule,
      timeOutSchedule,
    },
  } = intern;

  const { internshipDetails } = intern;

  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const [remarks, setRemarks] = useState("");

  const handleTextAreaChange = (value) => {
    setRemarks(value);
  };

  const handleDetails = () => {
    setDetailsOpen(!isDetailsOpen);
  };

  const handleForm = (e) => {
    e.preventDefault();
    setDetailsOpen(false);

    const selectedAction = e.target.textContent;
    if (selectedAction === "Decline") {
      const form = {
        email,
        verification: {
          hasSentVerification: false,
          isVerified: false,
          isRejected: true,
          remarks,
        },
      };
      console.log("Request Rejected");
      dispatch(updateIntern({ form, index }));
    } else {
      const form = {
        email,
        verification: {
          hasSentVerification: false,
          isVerified: true,
          isRejected: false,
          remarks,
        },
        internshipDetails: { ...intern.internshipDetails },
      };
      dispatch(updateIntern({ form, index }));
      console.log("Request Accepted");
    }
  };

  console.log(intern);

  return (
    <section className="approval-intern">
      {isDetailsOpen && (
        <div className="overlay">
          <div className="intern-modal">
            <div className="sent-details">
              <div className="img-container">
                <img src={link} alt="" />
              </div>

              <div className="student-details-container">
                <div className="student-details">
                  <h4>Student Details</h4>

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
                  <b> {internshipDetails.email}</b>
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
            <div className="feedback-container">
              <form>
                <div className="forms">
                  <label htmlFor="">
                    <p>
                      <b>
                        Remarks <span>{`(optional)`}</span>
                      </b>
                    </p>
                    <textarea
                      value={remarks}
                      onChange={(e) => handleTextAreaChange(e.target.value)}
                      name="remarks"
                      id="remarks"
                      maxLength={60}></textarea>
                  </label>
                </div>
                <div className="btn-container">
                  <button className="back-btn" onClick={handleDetails}>
                    Back
                  </button>
                  <button className="decline-btn" onClick={handleForm}>
                    <span>
                      <FaTrash />
                    </span>
                    Decline
                  </button>
                  <button className="approve-btn" onClick={handleForm}>
                    <span>
                      <FaCheck />
                    </span>
                    Approve
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="intern-left">
        <img src={profileImage} alt="profile-image" />
      </div>
      <div className="intern-right">
        <div className="intern-details">
          <p className="fullName">
            <b>
              {firstName} {lastName}
            </b>
          </p>
          <p className="program">{program}</p>
        </div>
        <button className="view" onClick={handleDetails}>
          View More Details
        </button>
      </div>
    </section>
  );
});

export default ApprovalIntern;
