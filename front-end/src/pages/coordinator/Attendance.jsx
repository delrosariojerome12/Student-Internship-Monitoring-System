import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getAllAttendanceToday} from "../../features/coordinator/monitorAttendance";
import Bouncing from "../../components/loading/Bouncing";
import ServerError from "../serverError";
import Attendance from "../../components/coordinator/Attendance";

const MonitorAttendance = () => {
  const {isLoading, isError, attendanceToday} = useSelector(
    (state) => state.monitorAttendance
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAttendanceToday({}));
  }, []);

  if (isLoading || !attendanceToday) {
    return <Bouncing />;
  }
  if (isError) {
    return <ServerError />;
  }

  return <div className="monitor-attendance">Attendance</div>;
};

export default MonitorAttendance;
