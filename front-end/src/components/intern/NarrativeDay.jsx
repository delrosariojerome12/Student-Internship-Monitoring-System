/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import {
  handleAddModal,
  handleViewModal,
  handleEditModal,
} from "../../features/interns/narrativeReducer";

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

const NarrativeDay = React.memo(({ day, details }) => {
  const dispatch = useDispatch();
  const {
    narrative: { isComplete },
    date,
  } = details;

  return (
    <div className="narrative-day">
      <div className="num-days">
        <h5>Day {day === 0 ? 1 : day + 1}</h5>
        <h5>{formatDate(date)}</h5>
      </div>
      <div className="status">
        <h5 style={{ color: isComplete ? "#00caa9" : "#414141" }}>
          {isComplete ? "Completed" : "Pending"}
        </h5>
      </div>
      <div className="btn-container">
        {isComplete ? (
          <>
            <button onClick={() => dispatch(handleViewModal({ day: details }))}>
              View
            </button>
            <button onClick={() => dispatch(handleEditModal({ day: details }))}>
              Edit
            </button>
          </>
        ) : (
          <button onClick={() => dispatch(handleAddModal({ day: details }))}>
            Add
          </button>
        )}
      </div>
    </div>
  );
});

export default NarrativeDay;
