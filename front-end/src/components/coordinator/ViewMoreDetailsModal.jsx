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
          <div className="rendered-hours">
            <p>
              <b>Date: </b>
              {formatDate(date)}
            </p>
            <p>
              <b>Rendered Hours: </b> {totalRendered}hrs
            </p>
            <p>
              <b>OT: </b> {OT}hrs
            </p>
          </div>

          <div className="time-in">
            {proof.timeInLink && (
              <>
                <p>
                  <b>Time in: </b> {timeIn}
                </p>
                <p>
                  <b>Location Time in: </b> {locationTimeIn}
                </p>
                <img src={proof.timeInLink} alt="time-in" />
              </>
            )}
          </div>
          {proof.timeOutLink && (
            <div className="time-out">
              <p>
                <b>Time out: </b> {timeOut}
              </p>
              <p>
                <b>Location Time out: </b> {locationTimeOut}
              </p>
              <img src={proof.timeOutLink} alt="time-out" />
            </div>
          )}
        </div>
        <div className="btn-controller">
          <button onClick={() => dispatch(handleCloseModal())}>Close</button>
        </div>
      </div>
    </>
  );
});

export default ViewMoreDetailsModal;
