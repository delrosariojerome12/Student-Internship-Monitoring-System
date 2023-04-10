import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllAttendance } from "../../../features/interns/attendanceReducer";
import Bouncing from "../../../components/loading/Bouncing";
import ServerError from "../../serverError";
import Attendance from "../../../components/intern/Attendance";
import CantStart from "../../dashboard/CantStart";
import NoDocumentSvg from "../../../assets/img/approvals.svg";
import { useParams } from "react-router";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const AttendanceCoordinator = React.memo(() => {
  const {
    isLoading,
    isError,
    selectedAttendance,
    allAttendance,
    isTodayOpen,
    todayAttendance,
  } = useSelector((state) => state.attendance);
  const {
    selectedIntern: {
      internshipDetails: { startingDate },
      scheduleDetails,
      status,
      // email,
    },
  } = useSelector((state) => state.intern);
  const {
    user: {
      user: { role },
    },
  } = useSelector((state) => state.user);

  const { email } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAttendance({ email, scheduleDetails }));
  }, []);

  if (isError) {
    return <ServerError />;
  }
  if (isLoading || !allAttendance) {
    return <h1>Loading...</h1>;
  }
  if (status === "Not Started") {
    if (role === "coordinator") {
      return (
        <div className="cant-start">
          <div className="cant-start-modal">
            <h3>This intern has not started yet.</h3>
          </div>
        </div>
      );
    }
    return <CantStart startingDate={startingDate} />;
  }
  const formatDate = (date) => {
    const dateArr = date.split("-");
    return `${months[parseInt(dateArr[0].slice(1)) - 1]} ${dateArr[1]} ${
      dateArr[2]
    }`;
  };

  const renderAttendance = () => {
    if (allAttendance.length === 0) {
      return (
        <div className="no-record">
          <h3>
            No Attendance <b>Recorded</b> Yet.
          </h3>
          <img src={NoDocumentSvg} alt="no-attendace-img" />
        </div>
      );
    }
    return allAttendance.map((item, index) => {
      const { date, isPresent, timeIn, timeOut, totalRendered } = item;

      if (isPresent) {
        return (
          <div className="attendance-view" key={index}>
            <div className="left">
              <h4>{formatDate(date)}</h4>
              <h4 className="present">Present</h4>
            </div>
            <h4>Total Rendered: {totalRendered}hrs</h4>
            <div className="right">
              <h4>Time in: {timeIn}</h4>
              <h4>Time out: {timeOut ? timeOut : "Pending"} </h4>
            </div>
          </div>
        );
      }
      return (
        <div className="attendance-absent" key={index}>
          <h4>{formatDate(date)}</h4>
          <h4 className="Absent">Absent</h4>
        </div>
      );
    });
  };

  return <div className="attendance-container">{renderAttendance()}</div>;
});

export default AttendanceCoordinator;
