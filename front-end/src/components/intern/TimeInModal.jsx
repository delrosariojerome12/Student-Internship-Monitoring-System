import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {handleTimeIn} from "../../features/interns/attendanceReducer";
const TimeInModal = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="overlay" onClick={() => dispatch(handleTimeIn())}></div>
      <div className="time-in modal">
        <p></p>
      </div>
    </>
  );
};

export default TimeInModal;
