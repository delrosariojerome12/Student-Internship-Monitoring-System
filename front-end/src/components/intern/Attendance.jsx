import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {handleViewToday} from "../../features/interns/attendanceReducer";

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

const Attendance = React.memo(({attendance}) => {
  // const {isTodayOpen} = useSelector((state) => state.attendance);
  const dispatch = useDispatch();
  const {_id, date} = attendance;

  const formatDate = (date) => {
    const dateArr = date.split("-");
    return `${months[parseInt(dateArr[0].slice(1)) - 1]} ${dateArr[1]}, ${
      dateArr[2]
    }`;
  };

  return (
    <div
      className="attendance"
      onClick={() => {
        dispatch(handleViewToday({id: _id}));
      }}
    >
      {formatDate(date)}
    </div>
  );
});

export default Attendance;
