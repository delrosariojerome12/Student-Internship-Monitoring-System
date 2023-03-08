import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getAllAttendanceToday} from "../../features/coordinator/monitorAttendance";

const Attendance = () => {
  const {isLoading, isError, attendanceToday} = useSelector(
    (state) => state.monitorAttendance
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAttendanceToday({}));
  }, []);

  if (isLoading || !attendanceToday) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error</h1>;
  }
  console.log(attendanceToday);

  return <div className="monitor-attendance">Attendance</div>;
};

export default Attendance;
