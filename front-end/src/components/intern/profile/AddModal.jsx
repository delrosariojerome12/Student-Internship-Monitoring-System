import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  handleAddModal,
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

const AddModal = React.memo(() => {
  const {selectedDay} = useSelector((state) => state.narrative);
  const [textValue, setTextValue] = useState("");
  const dispatch = useDispatch();

  const {
    day: {
      email,
      date,
      narrative: {isComplete},
    },
  } = selectedDay;

  return (
    <>
      <div className="overlay"></div>
      <div className="add-modal modal">
        <div className="upper">
          <h3>Add Narrative</h3>
          <h3>{formatDate(date)}</h3>
          <h3>{isComplete ? "Completed" : "Missing"}</h3>
        </div>
        <div className="middle">
          <textarea
            name="textValue"
            id="textValue"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          ></textarea>
        </div>
        <div className="btn-controller">
          <button onClick={() => dispatch(handleAddModal())}>Close</button>
          <button
            onClick={() =>
              dispatch(updateNarrative({date, content: textValue, email}))
            }
          >
            Save Narrative
          </button>
        </div>
      </div>
    </>
  );
});

export default AddModal;
