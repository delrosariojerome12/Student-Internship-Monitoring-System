import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {handleViewNarrative} from "../../features/coordinator/monitorAttendance";

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

const ViewNarrative = React.memo(() => {
  const {selectedIntern} = useSelector((state) => state.monitorAttendance);
  const dispatch = useDispatch();

  const {
    date,
    narrative: {content, isComplete},
  } = selectedIntern;

  return (
    <>
      <div className="overlay"></div>
      <div className="narrative-content">
        <div className="upper">
          <h3>Narrative</h3>
          <h4>Date: {formatDate(date)}</h4>
        </div>
        <div className="details">
          <textarea disabled>{content}</textarea>
        </div>
        <div className="btn-controller">
          <button onClick={() => dispatch(handleViewNarrative())}>Close</button>
        </div>
      </div>
    </>
  );
});

export default ViewNarrative;
