/** @format */

import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {handleCloseModal} from "../../features/coordinator/monitorAttendance";

const ViewMoreDetailsModal = React.memo(() => {
  const {selectedIntern} = useSelector((state) => state.monitorAttendance);
  const dispatch = useDispatch();

  const {
    date,
    isComplete,
    isLate,
    locationTimeIn,
    locationTimeOut,
    timeIn,
    timeOut,
    totalRendered,
    OT,
    isPresent,
    proof,
    narrative: {content},
  } = selectedIntern;

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

  const formatDate = (date) => {
    const dateArr = date.split("-");
    return `${months[parseInt(dateArr[0].slice(1)) - 1]} ${dateArr[1]}, ${
      dateArr[2]
    }`;
  };

  return (
    <>
      <div
        className="overlay"
        onClick={() => dispatch(handleCloseModal())}
      ></div>
      <div className="more-details modal">
        <div className="details">
          <h4>Date: {formatDate(date)}</h4>
          <h4>Rendered Hours: {totalRendered}hrs</h4>
          <h4>OT: {OT}hrs</h4>
          <div className="time-in">
            {proof.timeInLink && (
              <>
                <h4>Time in: {timeIn}</h4>
                <h4>Location Time in: {locationTimeIn}</h4>
                <img src={proof.timeInLink} alt="time-in" />
              </>
            )}
          </div>

          <div className="time-out">
            {proof.timeOutLink && (
              <>
                <h4>Time out: {timeOut}</h4>
                <h4>Location Time out: {locationTimeOut}</h4>
                <img src={proof.timeOutLink} alt="time-out" />
              </>
            )}
          </div>
        </div>
        <div className="btn-controller">
          <button onClick={() => dispatch(handleCloseModal())}>Close</button>
        </div>
      </div>
    </>
  );
});

export default ViewMoreDetailsModal;
