import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {handleViewToday} from "../../features/interns/attendanceReducer";

const Attendance = React.memo(({attendance}) => {
  // const {isTodayOpen} = useSelector((state) => state.attendance);
  const dispatch = useDispatch();
  const {_id, date} = attendance;

  return (
    <div
      className="attendance"
      onClick={() => {
        dispatch(handleViewToday());
      }}
    >
      {date}
    </div>
  );
});

export default Attendance;
