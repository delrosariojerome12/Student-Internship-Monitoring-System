import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {handleAddModal} from "../../../features/interns/narrativeReducer";

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

const AddModal = React.memo(() => {
  const {selectedDay} = useSelector((state) => state.narrative);
  const dispatch = useDispatch();

  const {
    day: {date},
  } = selectedDay;

  return (
    <>
      <div className="overlay"></div>
      <div className="add-modal modal">
        <h3>Add</h3>
        <h3>{formatDate(date)}</h3>
        <button onClick={() => dispatch(handleAddModal())}>Close</button>
      </div>
    </>
  );
});

export default AddModal;
