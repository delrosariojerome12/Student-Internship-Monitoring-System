/** @format */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleEditModal,
  updateNarrative,
} from "../../../features/interns/narrativeReducer";

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

const EditModal = React.memo(() => {
  const { selectedDay } = useSelector((state) => state.narrative);
  const {
    day: {
      email,
      date,
      narrative: { isComplete, content },
    },
  } = selectedDay;
  const dispatch = useDispatch();

  const [textValue, setTextValue] = useState(content);

  return (
    <>
      <div
        className="overlay"
        onClick={() => dispatch(handleEditModal())}></div>
      <div className="edit-modal modal">
        <div className="upper">
          <h3>Edit Narrative</h3>
          <h3>{formatDate(date)}</h3>
          <h3 style={{ color: isComplete ? "#00adb5" : "#e63946" }}>
            {isComplete ? "Completed" : "Missing"}
          </h3>
        </div>
        <div className="middle">
          <textarea
            name="textValue"
            id="textValue"
            value={textValue}
            onChange={(e) => {
              setTextValue(e.target.value);
            }}></textarea>
        </div>
        <div className="btn-controller">
          <button
            className="close-btn"
            onClick={() => dispatch(handleEditModal())}>
            Close
          </button>
          <button
            className="save-btn"
            onClick={() =>
              dispatch(updateNarrative({ date, content: textValue, email }))
            }>
            Save Narrative
          </button>
        </div>
      </div>
    </>
  );
});

export default EditModal;
