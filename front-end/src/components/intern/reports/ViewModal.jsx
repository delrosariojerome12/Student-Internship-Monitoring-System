import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {handleViewModal} from "../../../features/interns/narrativeReducer";
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

const ViewModal = React.memo(() => {
  const {selectedDay} = useSelector((state) => state.narrative);
  const dispatch = useDispatch();

  const {
    day: {
      date,
      narrative: {isComplete, content},
    },
  } = selectedDay;

  return (
    <>
      <div className="overlay"></div>
      <div className="view-modal modal">
        <div className="upper">
          <h3>View Narrative</h3>
          <h3>{formatDate(date)}</h3>
          <h3>{isComplete ? "Completed" : "Missing"}</h3>
        </div>
        <div className="middle">
          <textarea
            name="textValue"
            id="textValue"
            value={content}
            disabled
          ></textarea>
        </div>
        <div className="btn-controller">
          <button onClick={() => dispatch(handleViewModal())}>Close</button>
        </div>
      </div>
    </>
  );
});

export default ViewModal;
