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
    proof,
    timeIn,
    timeOut,
    totalRendered,
    OT,
    proof: {timeInLink, timeOutLink},
  } = selectedAttendance;

  return (
    <>
      <div
        className="overlay"
        onClick={() => dispatch(handleViewToday())}
      ></div>
      <div className="attendance-view modal">
        <div className="upper">
          <p>Date: {date}</p>
          <p>Time in: {timeIn}</p>
          <p>Time in: {timeOut}</p>
          <p>OT: {OT}</p>
          <p>Location: {location}</p>
          <div className="img-con">
            {timeInLink && <img src={timeInLink} alt={"proof"} />}
            {timeOutLink && <img src={timeOutLink} alt={"proof"} />}
          </div>
        </div>
        <div className="lower"></div>
      </div>
      ;
    </>
  );
});

export default AttendanceModal;
