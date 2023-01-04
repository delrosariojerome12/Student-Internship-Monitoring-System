import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIntern, updateIntern} from "../../features/interns/internReducer";
import {FaCheck, FaTrash} from "react-icons/fa";

const ApprovalIntern = React.memo(({intern, index}) => {
  const {selectedIntern} = useSelector((state) => state.intern);
  const dispatch = useDispatch();

  const {
    user: {firstName, lastName, email, profileImage},
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
        },
      };
      dispatch(updateIntern({form, index}));
      console.log("Request Accepted");
    }
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
                <p>Email: {email}</p>
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
            <div className="feedback-container">
              <form>
                <div className="forms">
                  <label htmlFor="">
                    <p>
                      Remarks <span>{`(optional)`}</span>
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
                  <button onClick={handleDetails}>Back</button>
                  <button onClick={handleForm}>
                    <FaTrash />
                    Decline
                  </button>
                  <button onClick={handleForm}>
                    <FaCheck />
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
