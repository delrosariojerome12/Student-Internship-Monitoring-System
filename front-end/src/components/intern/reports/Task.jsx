import React, {useState} from "react";
import Select from "react-select";
import {FaTrash} from "react-icons/fa";
import {useSelector} from "react-redux";
const Task = React.memo(({item, index, task, setTasks, tasks}) => {
  const {
    user: {
      user: {role},
    },
  } = useSelector((state) => state.user);
  const options = [
    {
      label: "Done",
      value: "done",
    },
    {
      label: "Pending",
      value: "pending",
    },
  ];

  const customStyle = {
    control: (styles) => ({
      ...styles,
      border: "solid 1px #8b8b8b",
      fontSize: "1.5rem",
      //   paddingLeft: "10px",
      height: "50px",
      marginTop: 0,
      paddingTop: 0,
    }),
    options: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "red" : "green",
      height: "50px",
    }),
    menu: (base) => ({
      ...base,
      marginTop: 0,
    }),
  };

  return (
    <div className="task">
      <div className="input-contain">
        <label>
          <input
            disabled={role === "coordinator"}
            type="text"
            required
            name="title"
            value={task.title}
            onChange={(e) => {
              const newForm = {...task};
              newForm.title = e.target.value;
              const allForm = [...tasks];
              allForm[index] = newForm;
              setTasks(allForm);
            }}
          />
          <div className="placeholder-container">
            <label
              className={
                task.title ? "placeholder-text active" : "placeholder-text"
              }
            >
              <div className="text">Task</div>
            </label>
          </div>
        </label>

        <label>
          <input
            disabled={role === "coordinator"}
            type="number"
            required
            name="title"
            value={task.hoursConsumed}
            max={8}
            min={1}
            onChange={(e) => {
              const newForm = {...task};
              newForm.hoursConsumed = e.target.value;
              const allForm = [...tasks];
              allForm[index] = newForm;
              setTasks(allForm);
            }}
          />
          <div className="placeholder-container">
            <label className={"placeholder-text active"}>
              <div className="text">Hours</div>
            </label>
          </div>
        </label>

        <Select
          isDisabled={role === "coordinator" ? true : false}
          value={
            task.status && {
              label: task.status.charAt(0).toUpperCase() + task.status.slice(1),
              value: task.status,
            }
          }
          placeholder={"Status"}
          options={options}
          styles={customStyle}
          onChange={(e) => {
            const newForm = {...task};
            newForm.status = e.value;
            const allForm = [...tasks];
            allForm[index] = newForm;
            setTasks(allForm);
          }}
          theme={(theme) => ({
            ...theme,
            outline: "solid 1px #8b8b8b",
            colors: {
              ...theme.colors,
              primary25: "#8b8b8b",
              primary: "#457b9d",
            },
          })}
        />

        {role !== "coordinator" && (
          <button
            onClick={() => {
              const allForm = [...tasks].filter((item, key) => key !== index);
              setTasks(allForm);
            }}
          >
            {/* Delete */}
            <FaTrash />
          </button>
        )}
      </div>
    </div>
  );
});

export default Task;
