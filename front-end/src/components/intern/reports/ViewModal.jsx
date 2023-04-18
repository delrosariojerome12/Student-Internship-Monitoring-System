import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {handleViewModal} from "../../../features/interns/narrativeReducer";
import Task from "./Task";

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
  const [tasks, setTasks] = useState(selectedDay.day.narrative.tasks);

  const {
    day: {
      date,
      narrative: {isComplete, content},
      totalRendered,
    },
  } = selectedDay;

  return (
    <>
      <div
        className="overlay"
        onClick={() => dispatch(handleViewModal())}
      ></div>
      <div className="view-modal modal">
        <div className="upper">
          <h3>View Narrative</h3>
          <h3>{formatDate(date)}</h3>
          <h3>{totalRendered}hrs</h3>
        </div>
        <div className="middle">
          {tasks.map((item, index) => {
            return (
              <Task
                key={index}
                index={index}
                item={item}
                task={tasks[index]}
                setTasks={setTasks}
                tasks={tasks}
              />
            );
          })}
        </div>
        <div className="btn-controller">
          <button
            className="close-btn"
            onClick={() => dispatch(handleViewModal())}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
});

export default ViewModal;
