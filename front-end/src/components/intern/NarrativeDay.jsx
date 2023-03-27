import React from "react";
import {useDispatch} from "react-redux";
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

const NarrativeDay = React.memo(({day, details}) => {
  const dispatch = useDispatch();
  const {isComplete, narrative, date, isPresent} = details;

  const renderStatus = () => {
    if (isComplete && isPresent) {
      if (narrative.isComplete) {
        return "Completed";
      }
      return "Pending";
    } else {
      return "Absent";
    }
  };

  return (
    <div className="narrative-day">
      <div className="num-days">
        <h4>Day {day === 0 ? 1 : day + 1}</h4>
        <h5>{formatDate(date)}</h5>
      </div>
      <div className="status">{renderStatus()}</div>

      {isComplete && isPresent && (
        <div className="btn-container">
          {narrative.isComplete ? (
            <>
              <button onClick={() => dispatch(handleViewModal({day: details}))}>
                View
              </button>
              <button onClick={() => dispatch(handleEditModal({day: details}))}>
                Edit
              </button>
            </>
          ) : (
            <button onClick={() => dispatch(handleAddModal({day: details}))}>
              Add
            </button>
          )}
        </div>
      )}
    </div>
  );
});

export default NarrativeDay;
