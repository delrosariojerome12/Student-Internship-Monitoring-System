import React from "react";

const Attendance = React.memo(({attendance}) => {
  console.log(attendance);
  return <div className="day-attendance">Attendance</div>;
});

export default Attendance;
