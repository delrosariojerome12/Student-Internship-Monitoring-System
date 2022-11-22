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
      group: "internship-details",
      forms: [
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
          id: "company-name",
          forInput: "Company Name",
          value: "",
          isError: false,
          errorMessage: "Atleast 2 characters and max of 30",
        },
        {
          type: "text",
          id: "company-address",
          forInput: "Company Address",
          value: "",
          isError: false,
          errorMessage: "Atleast 10 characters and max of 50",
        },
        {
          type: "text",
          id: "supervisor",
          forInput: "Supervisor",
          value: "",
          isError: false,
          errorMessage: "Atleast 2 characters and  max of 20",
        },
        {
          type: "text",
          id: "supervisor-contact",
          forInput: "Supervisor Contact",
          value: "",
          isError: false,
          errorMessage: "This phone number format is not recognized. ",
        },
      ],
    },
    {
      group: "student-details",
      forms: [
        {
          type: "select",
          id: "department",
          value: "",
          options: [
            {
              value: "College of Computer Studies and Engineering",
              label: "College of Computer Studies and Engineering",
            },
            {
              value: "College of Business",
              label: "College of Business",
            },
            {
              value: "College of Tourism Management and Hospitality",
              label: "College of Tourism Management and Hospitality",
            },
            {
              value: "College of Medical Allied Courses",
              label: "College of Medical Allied Courses",
            },
          ],
        },
        {
          type: "image",
          id: "valid-id",
          forInput: "",
          value: "",
          isError: false,
          errorMessage: "",
        },
        {
          type: "text",
          id: "required-hours",
          forInput: "Required Hours",
          value: "",
          isError: false,
        },
      ],
    },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [atNextPage, setNextPage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
  };

  const handleOnChange = (value, group, index, mainIndex) => {
    const newForm = [...form];
    const inputField = newForm[mainIndex].forms[index].id;
    switch (inputField) {
      case "company-name":
        value.length >= 2 && value.length <= 30
          ? (newForm[mainIndex].forms[index].isError = false)
          : (newForm[mainIndex].forms[index].isError = true);
        newForm[mainIndex].forms[index].value = value;

        setForm(newForm);
        return;
      case "company-address":
        value.length >= 10 && value.length <= 50
          ? (newForm[mainIndex].forms[index].isError = false)
          : (newForm[mainIndex].forms[index].isError = true);
        newForm[mainIndex].forms[index].value = value;
        setForm(newForm);
        return;
      case "supervisor":
        const result = value.replace(/[^a-z]/gi, "");
        newForm[mainIndex].forms[index].value = result;

        value.length >= 2 && value.length <= 20
          ? (newForm[mainIndex].forms[index].isError = false)
          : (newForm[mainIndex].forms[index].isError = true);

        setForm(newForm);
        return;
      case "supervisor-contact":
        newForm[mainIndex].forms[index].value = value;
        const passwordRegex = /^(09|\+639)\d{9}$/;
        let isConctactValid = passwordRegex.test(value);
        if (isConctactValid) {
          newForm[mainIndex].forms[index].isError = false;
        } else {
          newForm[mainIndex].forms[index].isError = true;
        }
        setForm(newForm);
        return;
      default:
        newForm[mainIndex].forms[index].value = value;
        setForm(newForm);
        console.log(newForm);
        return;
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    let numOfErrors = 0;
    let numOfValues = 0;
    form[0].forms.forEach((item) => {
      item.isError && numOfErrors++;
      item.value && numOfValues++;
    });

    if (numOfErrors === 0 && numOfValues === 6) {
      setNextPage(!atNextPage);
    }
  };

  const handleKeydown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
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
    menu: (base) => ({
      ...base,
      marginTop: 0,
    }),
  };

  const renderInputs = (arr, group, mainIndex) => {
    return arr.map((item, index) => {
      const {
        type,
        id,
        value,
        forInput,
        maxLength,
        minLength,
        isError,
        errorMessage,
      } = item;
      switch (type) {
        case "text":
          return (
            <div className="input-contain" key={index}>
              <input
                required
                value={value}
                onChange={(e) =>
                  handleOnChange(e.target.value, group, index, mainIndex)
                }
                onKeyDown={handleKeydown}
                minLength={minLength}
                maxLength={maxLength}
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
              {isError && <p className="error-message">{errorMessage}</p>}
            </div>
          );
        case "image":
          return (
            <div className="img-input" key={index}>
              <label htmlFor="valid-img">School ID</label>
              <input
                onChange={(e) =>
                  handleOnChange(e.target.value, group, index, mainIndex)
                }
                required
                type="file"
                name="valid-img"
                id="valid-img"
                accept="image/*"
              />
            </div>
          );
        case "select":
          const {options} = item;
          const list = options.map((opt) => opt);
          return (
            <Select
              name={forInput}
              styles={customStyle}
              required
              onChange={(e) => handleOnChange(e.value, group, index, mainIndex)}
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
              onChange={(e) => handleOnChange(e.value, group, index, mainIndex)}
              placeholder="Work in Internship"
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

        default:
          return null;
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
      <div
        style={!isModalOpen ? {display: "none"} : null}
        className={atNextPage ? "modal verify" : "modal"}
      >
        <form onSubmit={handleSubmit}>
          <div
            className={
              atNextPage ? "internship-details inactive" : "internship-details"
            }
          >
            <h3>Internship Details</h3>
            <div className="forms-con">
              {renderInputs(form[0].forms, "internship-details", 0)}
            </div>
            <button onClick={handleNext}>Next</button>
          </div>
          <div
            className={
              atNextPage ? "student-details active" : "student-details"
            }
          >
            <h3>Student Details</h3>
            {renderInputs(form[1].forms, "student-details", 1)}
            <div className="btn-con">
              <button onClick={() => setNextPage(!atNextPage)}>Back</button>
              <button>Submit Verification</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pending;
