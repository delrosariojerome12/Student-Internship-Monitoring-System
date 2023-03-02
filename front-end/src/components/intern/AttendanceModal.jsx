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
  } = selectedAttendance;

  console.log(selectedAttendance);
  console.log(user);
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
        </div>
        <div className="lower"></div>
      </div>
      ;
    </>
  );
});

export default AttendanceModal;
