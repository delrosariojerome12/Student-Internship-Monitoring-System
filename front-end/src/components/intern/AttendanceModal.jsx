/** @format */

import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {handleViewToday} from "../../features/interns/attendanceReducer";
import absent from "../../assets/img/absent.svg";
import {FaRegFrownOpen} from "react-icons/fa";
const AttendanceModal = React.memo(() => {
  const {selectedAttendance} = useSelector((state) => state.attendance);
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    date,
    isComplete,
    isLate,
    locationTimeIn,
    locationTimeOut,
    timeIn,
    timeOut,
    totalRendered,
    OT,
    isPresent,
    proof,
  } = selectedAttendance;

  if (!isPresent) {
    return (
      <>
        <div
          className="overlay"
          onClick={() => dispatch(handleViewToday())}
        ></div>

        <div className="attendance-absent modal">
          <div className="absent-top">
            <img src={absent} alt="" />
            {/* <span>
              <FaRegFrownOpen />
            </span> */}
            <h1>Unable to attend</h1>
          </div>
          <div className="btn-close">
            <button
              className="close"
              onClick={() => dispatch(handleViewToday())}
            >
              Close
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className="overlay"
        onClick={() => dispatch(handleViewToday())}
      ></div>
      <div className="attendance-view modal">
        <div className="upper">
          <div className="attendance-info">
            <p>
              <b> Date: </b>
              {date}
            </p>
            <p>
              <b>Time in: </b> {timeIn}
            </p>
            <p>
              <b> Time out: </b>
              {!timeOut ? "Pending" : timeOut}
            </p>
            <p>
              <b> OT: </b> {OT}
            </p>
            <p>
              <b>Rendered Hours: </b> {totalRendered}hrs
            </p>
            <p>
              <b> Time In Location: </b>
              {locationTimeIn}
            </p>
            <p>
              <b> Time Out Location: </b>
              {locationTimeOut ? locationTimeOut : "Pending"}
            </p>
          </div>
          <div className="img-con">
            <h3>
              Time In
              {proof.timeInLink && <img src={proof.timeInLink} alt={"proof"} />}
            </h3>

            {proof.timeOutLink && (
              <h3>
                Time Out
                <img src={proof.timeOutLink} alt={"proof"} />
              </h3>
            )}
          </div>
        </div>
        <div className="lower">
          <button onClick={() => dispatch(handleViewToday())}>Close</button>
        </div>
      </div>
    </>
  );
});

export default AttendanceModal;
