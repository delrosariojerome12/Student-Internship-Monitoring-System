import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {handleTimeOut} from "../../features/interns/attendanceReducer";
const TimeOutModal = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="overlay" onClick={() => dispatch(handleTimeOut())}></div>
      <div className="time-out modal"></div>
    </>
  );
};

export default TimeOutModal;
