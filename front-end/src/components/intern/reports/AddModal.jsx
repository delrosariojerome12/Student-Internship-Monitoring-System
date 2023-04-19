/** @format */

import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  handleAddModal,
  updateNarrative,
} from "../../../features/interns/narrativeReducer";
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

const AddModal = React.memo(() => {
  const {selectedDay} = useSelector((state) => state.narrative);
  const [textValue, setTextValue] = useState("");
  const [tasks, setTasks] = useState(selectedDay.day.narrative.tasks);
  const [isHrsError, setHrsError] = useState(false);
  const dispatch = useDispatch();

  const {
    day: {
      email,
      date,
      narrative: {isComplete},
      totalRendered,
    },
  } = selectedDay;

  // const totalHours = array.reduce((sum, obj) => sum + obj.hoursConsumed, 0);

  const checkTotalHrs = () => {
    const totalHours = tasks.reduce(
      (sum, obj) => sum + parseInt(obj.hoursConsumed),
      0
    );
    if (totalHours != totalRendered) {
      setHrsError(true);
      return;
    }
    setHrsError(false);
    return;
  };

  useEffect(() => {
    const titles = tasks.map((task) => task.title).join("\n");
    setTextValue(titles);
    checkTotalHrs();
  }, [tasks]);

  const handleAddTasks = () => {
    const newTask = {
      title: "New Task",
      hoursConsumed: 1,
      staus: "pending",
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  return (
    <>
      <div className="overlay" onClick={() => dispatch(handleAddModal())}></div>
      <div className="add-modal modal">
        <div className="upper">
          <h3>{formatDate(date)}</h3>
          <h3>{totalRendered}hrs</h3>
        </div>
        <div className="middle">
          <button onClick={() => handleAddTasks()}>Add Task</button>
          {isHrsError && (
            <h4>Narrative hrs and actual hrs rendered not matched.</h4>
          )}
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
          {/* <textarea
            name="textValue"
            placeholder="Please enter your report here...."
            id="textValue"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          ></textarea> */}
        </div>
        <div className="btn-controller">
          <button
            className="close-btn"
            onClick={() => dispatch(handleAddModal())}
          >
            Close
          </button>
          <button
            className="save-btn"
            style={
              isHrsError ? {pointerEvents: "none", opacity: ".6"} : {opacity: 1}
            }
            disabled={isHrsError ? true : false}
            onClick={() =>
              dispatch(
                updateNarrative({date, content: textValue, email, tasks})
              )
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
