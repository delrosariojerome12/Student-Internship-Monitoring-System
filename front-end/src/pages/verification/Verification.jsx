import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {useNavigate} from "react-router";
import {requestVerification} from "../../features/user/userReducer";

const days = [
  {
    value: "Monday",
    label: "Monday",
  },
  {
    value: "Tuesday",
    label: "Tuesday",
  },
  {
    value: "Wednesday",
    label: "Wednesday",
  },
  {
    value: "Thursday",
    label: "Thursday",
  },
  {
    value: "Friday",
    label: "Friday",
  },
  {
    value: "Saturday",
    label: "Saturday",
  },
];

const Verification = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [form, setForm] = useState([
    {
      group: "internship-details",
      forms: [
        // {
        //   type: "select",
        //   id: "internship-type",
        //   value: "",
        //   placeholder: "Type of Internship",
        //   isDisabled: false,
        //   code: "internshipType",
        //   options: [
        //     {
        //       value: "Onsite",
        //       label: "Onsite",
        //     },
        //     {
        //       value: "Online",
        //       label: "Online",
        //     },
        //     {
        //       value: "Hybrid",
        //       label: "Hybrid",
        //     },
        //   ],
        // },
        {
          type: "list",
          id: "duties",
          forInput: "Duties",
          value: "",
          isDisabled: false,
          code: "typeOfWork",
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
          isDisabled: false,
          code: "companyName",
        },
        {
          type: "text",
          id: "company-address",
          code: "companyAddress",
          forInput: "Company Address",
          value: "",
          isError: false,
          errorMessage: "Atleast 5 characters and max of 50",
          isDisabled: false,
        },
        {
          type: "text",
          id: "supervisor",
          code: "supervisor",
          forInput: "Supervisor",
          value: "",
          isError: false,
          errorMessage: "Atleast 2 characters and  max of 20",
          isDisabled: false,
        },
        {
          type: "text",
          id: "supervisor-contact",
          code: "supervisorContact",
          forInput: "Supervisor Contact",
          value: "",
          isError: false,
          errorMessage: "This phone number format is not recognized. ",
          isDisabled: false,
        },
      ],
    },
    {
      group: "student-details",
      forms: [
        // {
        //   type: "select",
        //   id: "department",
        //   code: "department",
        //   value: "",
        //   placeholder: "Department",
        //   options: [
        //     {
        //       value: "College of Computer Studies and Engineering",
        //       label: "College of Computer Studies and Engineering",
        //     },
        //     {
        //       value: "College of Business",
        //       label: "College of Business",
        //     },
        //     {
        //       value: "College of Tourism Management and Hospitality",
        //       label: "College of Tourism Management and Hospitality",
        //     },
        //     {
        //       value: "College of Medical Allied Courses",
        //       label: "College of Medical Allied Courses",
        //     },
        //   ],
        //   isDisabled: false,
        // },
        {
          type: "select",
          id: "program",
          code: "program",
          value: "",
          options: [
            {
              value: "Bachelor of Science in Information Technology",
              label: "Bachelor of Science in Information Technology",
            },
            {
              value: "Bachelor of Science in Computer Science",
              label: "Bachelor of Science in Computer Science",
            },
            {
              value: "Bachelor of Library Information System",
              label: "Bachelor of Library Information System",
            },
            {
              value: "Bachelor of Science in Computer Engineering",
              label: "Bachelor of Science in Computer Engineering",
            },
            {
              value: "Bachelor of Science in Electrical Engineering",
              label: "Bachelor of Science in Electrical Engineering",
            },
            {
              value:
                "Bachelor of Science in Electronics and Communications Engineering",
              label:
                "Bachelor of Science in Electronics and Communications Engineering",
            },
          ],
          placeholder: "Program",
          isDisabled: false,
        },
        {
          type: "image",
          id: "valid-id",
          code: "validID",
          forInput: "",
          value: "",
          isError: false,
          errorMessage: "",
          isDisabled: false,
        },
        {
          type: "text",
          id: "required-hours",
          code: "requiredHours",
          forInput: "Required Hours",
          value: "",
          isError: false,
          isDisabled: true,
        },
      ],
    },
    {
      group: "schedule-details",
      forms: [
        {
          type: "time",
          id: "time-in-schedule",
          forInput: "Time-In Schedule",
          value: "",
          isDisabled: false,
          code: "timeInSchedule",
          optionTime: [
            {
              value: "7:00 AM",
              label: "7:00 AM",
            },
            {
              value: "8:00 AM",
              label: "8:00 AM",
            },
            {
              value: "9:00 AM",
              label: "9:00 AM",
            },
          ],
        },
        {
          type: "time",
          id: "time-out-schedule",
          forInput: "Time-Out Schedule",
          value: "",
          isDisabled: false,
          code: "timeOutSchedule",
          optionTime: [
            {
              value: "4:00 PM",
              label: "4:00 PM",
            },
            {
              value: "5:00 PM",
              label: "5:00 PM",
            },
            {
              value: "6:00 PM",
              label: "6:00 PM",
            },
          ],
        },
        {
          type: "time",
          id: "starting-day",
          forInput: "Starting Day",
          value: "",
          isDisabled: false,
          code: "startingDay",
          optionTime: days,
        },
        {
          type: "time",
          id: "ending-day",
          forInput: "Ending Day",
          value: "",
          isDisabled: false,
          code: "endingDay",
          optionTime: days,
        },
      ],
    },
  ]);
  const [atNextPage, setNextPage] = useState(false);
  // const [position]
  const convertForm = (form) => {
    const newData = form.map((input) => {
      const {code, value} = input;
      return {
        code,
        value,
      };
    });

    const newObject = Object.assign(
      {},
      ...newData.map((item) => ({[item.code]: item.value}))
    );

    return newObject;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalForm = {
      email: user.email,
      internshipDetails: convertForm([...form[0].forms]),
      schoolDetails: convertForm([...form[1].forms]),
      verification: {
        hasSentVerification: true,
        isVerified: false,
        isRejected: false,
      },
    };
    dispatch(requestVerification(finalForm));
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
        value.length >= 5 && value.length <= 50
          ? (newForm[mainIndex].forms[index].isError = false)
          : (newForm[mainIndex].forms[index].isError = true);
        newForm[mainIndex].forms[index].value = value;
        setForm(newForm);
        return;
      case "supervisor":
        value.length >= 2 && value.length <= 20
          ? (newForm[mainIndex].forms[index].isError = false)
          : (newForm[mainIndex].forms[index].isError = true);
        newForm[mainIndex].forms[index].value = value;
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
      // case "department":
      //   newForm[mainIndex].forms[index].value = value;
      //   const departmentValue = newForm[mainIndex].forms[index].value;
      //   checkDepartment(departmentValue, mainIndex, index);
      //   setForm(newForm);
      //   return;
      case "program":
        newForm[mainIndex].forms[index].value = value;
        setForm(newForm);
        return;
      default:
        newForm[mainIndex].forms[index].value = value;
        setForm(newForm);
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

    // if (numOfErrors === 0 && numOfValues === 5) {
    //   setNextPage(!atNextPage);
    // }
    setNextPage(!atNextPage);
  };

  const handleKeydown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const customStyle = {
    control: (styles) => ({
      ...styles,
      border: "solid 1px #8b8b8b",
      fontSize: "1.5rem",
      paddingLeft: "10px",
      height: "50px",
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
        isDisabled,
      } = item;
      switch (type) {
        case "text":
          return (
            <div className="input-contain" key={index}>
              <input
                disabled={isDisabled}
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
          const {options, placeholder} = item;
          const list = options.map((opt) => opt);
          return (
            <Select
              options={list}
              styles={customStyle}
              onChange={(e) => handleOnChange(e.value, group, index, mainIndex)}
              name={forInput}
              placeholder={placeholder}
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
        case "time":
          const {optionTime} = item;
          return (
            <Select
              className="time"
              options={optionTime}
              styles={customStyle}
              onChange={(e) => handleOnChange(e.value, group, index, mainIndex)}
              name={forInput}
              placeholder={forInput}
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
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="verification-container">
      {/* <form onSubmit={handleSubmit}>
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
          className={atNextPage ? "student-details active" : "student-details"}
        >
          <h3>Student Details</h3>
          <div className="forms-con">
            {renderInputs(form[1].forms, "student-details", 1)}
          </div>
          <div className="btn-con">
            <button onClick={() => setNextPage(!atNextPage)}>Back</button>
            <button>Submit Verification</button>
          </div>
        </div>
      </form> */}
    </div>
  );
};

export default Verification;
