import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {handleViewToday} from "../../features/interns/attendanceReducer";

const AttendanceModal = React.memo(() => {
  const {selectedAttendance} = useSelector((state) => state.attendance);
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    date,
    isComplete,
    isLate,
    location,
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
          <h1>Absent</h1>
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
              {timeOut}
            </p>
            <p>
              <b> OT: </b> {OT}
            </p>
            <p>
              <b> Location: </b>
              {location}
            </p>
          </div>
          <div className="img-con">
            <h3>
              Time In
              {proof.timeInLink && <img src={proof.timeInLink} alt={"proof"} />}
            </h3>
            <h3>
              Time Out
              {proof.timeOutLink && (
                <img src={proof.timeOutLink} alt={"proof"} />
              )}
            </h3>
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
