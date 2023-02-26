import React from "react";
import {useSelector, useDispatch} from "react-redux";

const Attendance = React.memo(({attendance}) => {
  const addLeadingZero = (number) => {
    return number < 10 ? "0" + number : number;
  };

  const getTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let amOrPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // convert to 12-hour format
    minutes = addLeadingZero(minutes);
    seconds = addLeadingZero(seconds);

    return `${hours}:${minutes}:${seconds} ${amOrPm}`;
  };

  return (
    <div className="attendance" onClick={() => {}}>
      Attendance
    </div>
  );
});

export default Attendance;
