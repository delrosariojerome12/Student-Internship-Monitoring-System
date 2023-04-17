/** @format */

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateIntern} from "../../features/interns/internReducer";
import {FaCheck, FaTrash} from "react-icons/fa";
import {isRejected} from "@reduxjs/toolkit";
import CreatableSelect from "react-select/creatable";

const ApprovalIntern = React.memo(({intern, index}) => {
  // const {selectedIntern} = useSelector((state) => state.intern);
  const dispatch = useDispatch();

  const customStyle = {
    control: (styles) => ({
      ...styles,
      border: "solid 1px #8b8b8b",
      fontSize: "1.5rem",
      paddingLeft: "10px",
      height: "50px",
    }),
    options: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "red" : "green",
    }),
    menu: (base) => ({
      ...base,
      marginTop: 0,
    }),
  };

  const {
    user: {firstName, lastName, email, profileImage},
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
      logo,
      startingDate,
      description,
    },
    verification: {isVerified, hasSentVerification},
    scheduleDetails: {
      scheduleType,
      scheduledDays,
      timeInSchedule,
      timeOutSchedule,
    },
  } = intern;

  const {internshipDetails} = intern;

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
      dispatch(updateIntern({form, index}));
    } else {
      const form = {
        email,
        verification: {
          hasSentVerification: false,
          isVerified: true,
          isRejected: false,
          remarks,
        },
        internshipDetails: {...intern.internshipDetails},
      };
      dispatch(updateIntern({form, index}));
      console.log("Request Accepted");
    }
  };

  const optionItems = [
    {label: "Invalid ID", value: "Invalid ID"},
    {label: "Invalid Company Logo", value: "Invalid Company Logo"},
    {
      label: "Invalid Company Description",
      value: "Invalid Company Description",
    },
    {
      label: "Invalid/Suspicious Company Email ",
      value: "Invalid/Suspicious Company Email ",
    },
    {
      label: "Gibberish Sent Details",
      value: "Gibberish Sent Details",
    },
  ];

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
                    <b>
                      {firstName} {lastName}
                    </b>
                  </p>
                  <p>
                    <b> Program: </b>
                    {program}
                  </p>
                  <p>
                    <b> Required Hours: </b>
                    {requiredHours}
                  </p>
                  <p>
                    <b> Email: </b>
                    {email}
                  </p>
                  <p>
                    <b> Contact Number: </b>
                    {studentContact}
                  </p>
                </div>
              </div>
              <div className="schedule-details-container">
                <h4>Schedule Details</h4>
                <p>
                  <b> Schedule Type: </b>
                  {scheduleType}
                </p>
                <p>
                  <b>Days: </b>
                  {scheduledDays}
                </p>
                <p>
                  <b> Time: </b>
                  {`${timeInSchedule} - ${timeOutSchedule}`}
                </p>
                <p>
                  <b>Starting Date: </b>
                  {startingDate}
                </p>
              </div>
              <div className="internship-details-container">
                <h4>Internship Details</h4>
                <img src={logo.link} alt={logo.name} />
                <p>
                  <b> Company: </b>
                  {companyName}
                </p>
                <p>
                  <b> Address: </b>
                  {companyAddress}
                </p>
                <p>
                  <b> Supervisor: </b>
                  {supervisor}
                </p>
                <p>
                  <b> Email: </b>
                  {internshipDetails.email}
                </p>
                <p>
                  <b>Contact: </b>
                  {supervisorContact}
                </p>
                <p>
                  <b>Type of Work: </b>
                  {typeOfWork}
                </p>
                <p>
                  <b> Description: </b>
                  {description}
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
                    {/* <textarea
                      value={remarks}
                      onChange={(e) => handleTextAreaChange(e.target.value)}
                      name="remarks"
                      id="remarks"
                      maxLength={60}
                    ></textarea> */}
                    <CreatableSelect
                      tabIndex={-1}
                      styles={customStyle}
                      required
                      onChange={(e) => handleTextAreaChange(e.value)}
                      placeholder="Work in Internship"
                      theme={(theme) => ({
                        ...theme,
                        outline: "solid 1px #8b8b8b",
                        colors: {
                          ...theme.colors,
                          primary25: "#8b8b8b",
                          primary: "#457b9d",
                        },
                      })}
                      key={index}
                      options={optionItems}
                    />
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
          <p className="course">BSIT</p>
        </div>
        <button className="view" onClick={handleDetails}>
          More
        </button>
      </div>
    </section>
  );
});

export default ApprovalIntern;
