import React from "react";

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

const NarrativeDay = React.memo(({day, details}) => {
  const {
    narrative: {isComplete},
    date,
  } = details;

  const formatDate = (date) => {
    const dateArr = date.split("-");
    return `${months[parseInt(dateArr[0].slice(1)) - 1]} ${dateArr[1]}, ${
      dateArr[2]
    }`;
  };

  return (
    <div className="narrative-day">
      <div className="num-days">
        <h4>Day {day === 0 ? 1 : day + 1}</h4>
        <h5>{formatDate(date)}</h5>
      </div>
      <div className="status">{isComplete ? "Completed" : "Pending"}</div>
      <div className="btn-container">
        {!isComplete && <button>Add</button>}
        <button>Edit</button>
      </div>
    </div>
  );
});

export default NarrativeDay;
