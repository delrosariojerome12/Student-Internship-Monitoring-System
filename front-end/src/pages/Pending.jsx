import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {requestVerification} from "../features/user/userReducer";
const Pending = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);

  const [form, setForm] = useState([
    {
      type: "text",
      id: "company-name",
      forInput: "Company Name",
      value: "",
    },
    {
      type: "text",
      id: "company-address",
      forInput: "Company Address",
      value: "",
    },
    {
      type: "text",
      id: "supervisor",
      forInput: "Supervisor",
      value: "",
    },
    {
      type: "text",
      id: "supervisor-contact",
      forInput: "Supervisor Contact",
      value: "",
    },
    {
      type: "select",
      id: "internship-type",
      value: "",
      options: [
        {
          value: "Onsite",
          label: "Onsite",
        },
        {
          value: "Online",
          label: "Online",
        },
        {
          value: "Hybrid",
          label: "Hybrid",
        },
      ],
    },

    {
      type: "list",
      id: "duties",
      forInput: "Duties",
      value: "",
      value: "",
      optionItems: [
        {
          value: "Encoding",
          label: "Encoding",
        },
        {
          value: "Paper Works",
          label: "Paper Works",
        },
        {
          value: "Sofware Development",
          label: "Sofware Development",
        },
        {
          value: "Hardware Related",
          label: "Hardware Related",
        },
        {
          value: "Not specified",
          label: "Not specified",
        },
      ],
    },
    {
      type: "text",
      id: "required-hours",
      forInput: "Required Hours",
      value: "",
    },
    // {
    //   type: "image",
    //   id: "valid-id",
    //   forInput: "",
    //   value: "",
    // },
  ]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [atNextPage, setNextPage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleOnChange = (value, index) => {
    const newForm = [...form];
    newForm[index].value = value;
    setForm(newForm);
    console.log(newForm[index]);
  };

  const customStyle = {
    control: (styles) => ({
      ...styles,
      border: "solid 1px #8b8b8b",
      fontSize: "1.5rem",
      padding: "6.2px",
    }),
    options: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "red" : "green",
    }),
  };

  const renderInputs = () => {
    return form.map((item, index) => {
      const {type, id, value, forInput} = item;
      switch (type) {
        case "text":
          return (
            <div className="input-contain" key={index}>
              <input
                required
                value={value}
                onChange={(e) => handleOnChange(e.target.value, index)}
                type={type}
                name={forInput}
              />
              <div className="placeholder-container">
                <label
                  htmlFor={id}
                  className={
                    value ? "placeholder-text active" : "placeholder-text"
                  }
                >
                  <div className="text">{forInput}</div>
                </label>
              </div>
            </div>
          );
        case "image":
          return (
            <div className="img-input" key={index}>
              <label htmlFor="valid-img">School ID</label>
              <input required type="file" name="valid-img" id="valid-img" />
            </div>
          );
        case "select":
          const {options} = item;
          const list = options.map((opt) => opt);

          return (
            <Select
              styles={customStyle}
              required
              onChange={(e) => handleOnChange(e.value, index)}
              placeholder="Type of Internship"
              theme={(theme) => ({
                ...theme,
                outline: "solid 1px #8b8b8b",
                colors: {
                  ...theme.colors,
                  primary25: "#8b8b8b",
                  primary: "#457b9d",
                },
              })}
              key={index}
              options={list}
            />
          );
        case "list":
          const {optionItems} = item;
          return (
            <CreatableSelect
              styles={customStyle}
              required
              onChange={(e) => handleOnChange(e.value, index)}
              placeholder="Possible Work"
              theme={(theme) => ({
                ...theme,
                outline: "solid 1px #8b8b8b",
                colors: {
                  ...theme.colors,
                  primary25: "#8b8b8b",
                  primary: "#457b9d",
                },
              })}
              key={index}
              options={optionItems}
            />
          );
      }
    });
  };

  return (
    <div className="pending">
      {!isModalOpen && (
        <>
          <p>Fill up few more details and you are ready!</p>
          <button onClick={() => setModalOpen(!isModalOpen)}>
            Verify Account
          </button>
        </>
      )}
      <div style={!isModalOpen ? {display: "none"} : null} className="modal">
        <form onSubmit={handleSubmit}>
          <div
            className={
              atNextPage ? "internship-details inactive" : "internship-details"
            }
          >
            <h3>Internship Details</h3>
            {renderInputs()}
            <button onClick={() => setNextPage(!atNextPage)}>Next</button>
          </div>
          <div
            className={
              atNextPage ? "student-details active" : "student-details"
            }
            // className="student-details active"
          >
            <h3>Student Details Details</h3>
            <button>Submit Verification</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pending;
