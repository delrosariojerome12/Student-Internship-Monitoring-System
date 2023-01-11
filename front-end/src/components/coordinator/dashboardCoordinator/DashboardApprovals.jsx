import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIntern } from "../../../features/interns/internReducer";
import { FaCheck, FaTrash } from "react-icons/fa";

const DashboardApprovals = React.memo(({ intern, index }) => {
  const dispatch = useDispatch();

  const {
    user: { firstName, lastName, email, profileImage },
    schoolDetails: { program, studentContact, validID, requiredHours },
    internshipDetails: {
      companyAddress,
      companyName,
      supervisor,
      supervisorContact,
      typeOfWork,
    },
    verification: { isVerified, hasSentVerification },
    scheduleDetails: {
      scheduleType,
      scheduledDays,
      timeInSchedule,
      timeOutSchedule,
    },
  } = intern;

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
      console.log(remarks);
    } else {
      const form = {
        email,
        verification: {
          hasSentVerification: false,
          isVerified: true,
          isRejected: false,
          remarks,
        },
      };
      dispatch(updateIntern({ form, index }));
      console.log("Request Accepted");
    }
  };

  return (
    <section className="approvals-container">
      {isDetailsOpen && (
        <div className="overlay">
          <div className="intern-modal">
            <div className="sent-details">
              <img src={validID} id="valid-id" alt="student image" />

              <div className="student-details">
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
            </div>

            <div className="scedule-internship-details">
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
                      maxLength={60}
                    ></textarea>
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

      <div className="img-approvals">
        <img src={profileImage} alt="profile-image" />
      </div>

      <div className="text-approvals">
        <div className="approvals-details">
          <h4>
            {firstName} {lastName}
          </h4>
          <p>{program}</p>
        </div>

        <div className="approvals-btn">
          <button className="view-more" onClick={handleDetails}>
            View more details
          </button>
          {/* <button className="mark-done">Mark as done</button> */}
        </div>
      </div>
    </section>
  );
});

export default DashboardApprovals;
