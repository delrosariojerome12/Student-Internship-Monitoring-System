/** @format */

import React from "react";
import {useDispatch, useSelector} from "react-redux";
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
  const {
    user: {
      user: {role},
    },
  } = useSelector((state) => state.user);
  const renderStatus = () => {
    let color;
    if (isComplete && isPresent) {
      if (narrative.isComplete) {
        color = "#0d7377";
        return <h5 style={{color}}>Completed</h5>;
      }
      color = "#323232";
      return <h5 style={{color}}>Pending</h5>;
    } else {
      color = "#e63946";
      return <h5 style={{color}}>Absent</h5>;
    }
  };

  return (
    <div className="narrative-day">
      <div className="num-days">
        <h5>Day {day === 0 ? 1 : day + 1}</h5>
        <h5>{formatDate(date)}</h5>
      </div>
      {isComplete && isPresent && (
        <div className="btn-container">
          {role === "intern" ? (
            <>
              <button onClick={() => dispatch(handleAddModal({day: details}))}>
                Add
              </button>
            </>
          ) : (
            <>
              <>
                <button
                  onClick={() => dispatch(handleViewModal({day: details}))}
                >
                  View
                </button>
              </>
            </>
          )}
        </div>
      )}
    </div>
  );
});

export default NarrativeDay;
