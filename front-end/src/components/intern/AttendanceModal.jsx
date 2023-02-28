import React from "react";
import {useSelector} from "react-redux";
const AttendanceModal = React.memo(() => {
  const {selectedAttendance} = useSelector((state) => state.attendance);
  return <div className="attendance-modal">AttendanceModal</div>;
});

export default AttendanceModal;
