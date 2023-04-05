import React, {useEffect, useState, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {requestVerification} from "../../features/user/userReducer";
import AreYouSureModal from "../../components/verification/AreYouSureModal";

import {storage} from "../../Firebase";
import {ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";
import {v4} from "uuid";

import {FaCheck} from "react-icons/fa";

function convertObjectToFields(obj) {
  const fields = [];
  for (const key in obj) {
    if (key === "renderedHours" || key === "startingDate") {
      continue;
    }
    let field = {};
    switch (key) {
      case "date":
        field = {
          code: "startingDate",
          errorMessage: "Please Select a Weekday",
          forInput: "Starting Date",
          id: "starting-date",
          isDisabled: false,
          isError: false,
          type: "image",
          value: "",
        };
        break;
      case "logo":
        field = {
          code: key,
          errorMessage: "",
          forInput: "Logo",
          id: key,
          isDisabled: false,
          isError: false,
          type: "image",
          value: obj[key].link,
        };
        break;
      case "description":
        field = {
          code: key,
          errorMessage: "At least 10 characters and max of 500",
          forInput: "Description",
          id: key,
          isDisabled: false,
          isError: false,
          type: "textArea",
          value: obj[key],
        };
        break;
      case "typeOfWork":
        field = {
          code: key,
          errorMessage: "",
          forInput: "Type of Work",
          id: key,
          isDisabled: false,
          isError: false,
          type: "list",
          value: obj[key],
        };
        break;
      case "email":
        field = {
          code: key,
          errorMessage: "",
          forInput: "email",
          id: key,
          isDisabled: false,
          isError: false,
          type: "email",
          value: obj[key],
        };
        break;
      default:
        field = {
          code: key,
          errorMessage: "",
          forInput: key.charAt(0).toUpperCase() + key.slice(1),
          id: key,
          isDisabled: false,
          isError: false,
          type: typeof obj[key] === "number" ? "number" : "text",
          value: obj[key],
        };
        break;
    }
    fields.push(field);
  }
  return fields;
}

const Verification = React.memo(() => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);

  const {
    user: {firstName},
    schoolDetails,
    internshipDetails,
    verification: {isRejected, hasSentVerification},
  } = user;

  const {
    companyName,
    companyAddress,
    logo,
    description,
    email,
    supervisor,
    supervisorContact,
    typeOfWork,
  } = internshipDetails;

  const [form, setForm] = useState([
    {
      group: "Internship Details",
      forms: [
        {
          type: "image",
          id: "logo",
          code: "logo",
          forInput: "Logo",
          value: "",
          isError: false,
          errorMessage: "",
          isDisabled: false,
          name: "",
          link: "",
        },
        {
          type: "text",
          id: "company-name",
          forInput: "Company Name",
          value: "",
          isError: false,
          errorMessage: "Atleast 2 characters and max of 75",
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
          errorMessage: "Atleast 5 characters and max of 100",
          isDisabled: false,
        },
        {
          type: "text",
          id: "supervisor",
          code: "supervisor",
          forInput: "Supervisor",
          value: "",
          isError: false,

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
        {
          type: "email",
          id: "email",
          code: "email",
          forInput: "Email",
          value: "",
          isError: false,
          errorMessage: "Please provide valid email",
          isDisabled: false,
        },
        {
          type: "textArea",
          id: "description",
          forInput: "Description",
          value: "",
          isError: false,
          errorMessage: "Atleast 20 characters and max of 100",
          isDisabled: false,
          code: "description",
          minLength: 20,
          maxLength: 100,
        },
        {
          type: "date",
          id: "starting-date",
          forInput: "Starting Date",
          code: "startingDate",
          value: "",
          isError: false,
          errorMessage: "Please Select a Weekday",
          isDisabled: false,
        },
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
      ],
    },
    {
      group: "Student Details",
      forms: [
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
          ],
          placeholder: "Program",
          isDisabled: false,
        },
        {
          type: "image",
          id: "valid-id",
          code: "validID",
          forInput: "School ID",
          value: "",
          isError: false,
          errorMessage: "",
          isDisabled: false,
          name: " ",
          link: "",
        },

        {
          type: "text",
          id: "student-contact",
          code: "studentContact",
          forInput: "Student Contact",
          value: "",
          isError: false,
          errorMessage: "This phone number format is not recognized. ",
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
        {
          type: "text",
          id: "student-number",
          code: "studentNumber",
          forInput: "Student Number",
          value: "",
          isError: false,
          errorMessage: "Please enter a valid student number",
          isDisabled: false,
        },
      ],
    },
    {
      group: "Schedule Details",
      forms: [
        {
          type: "scheduleType",
          id: "schedule-type",
          forInput: "Schedule Type",
          value: "",

          isDisabled: true,
          code: "scheduleType",
          scheduleType: [
            {
              value: "Regular",
              label: "Regular",
            },
            {
              value: "Irregular",
              label: "Irregular",
            },
          ],
        },
        {
          type: "text",
          id: "time-in-schedule",
          forInput: "Time-In Schedule",
          value: "",
          isDisabled: true,
          isVisible: false,
          code: "timeInSchedule",
        },
        {
          type: "text",
          id: "time-out-schedule",
          forInput: "Time-Out Schedule",
          value: "",
          isDisabled: true,
          isVisible: false,
          code: "timeOutSchedule",
        },
        {
          type: "text",
          id: "scheduled-days",
          forInput: "Scheduled Days",
          value: "",
          isDisabled: true,
          isVisible: false,
          code: "scheduledDays",
        },
      ],
    },
  ]);

  const [position, setPosition] = useState(0);
  const [isFinalizing, setFinalizing] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const [isImageOpen, setImageOpen] = useState(false);
  const [steps, setSteps] = useState([
    {
      step: "1",
      isCompleted: false,
    },
    {
      step: "2",
      isCompleted: false,
    },
    {
      step: "3",
      isCompleted: false,
    },
  ]);

  const convertForm = (form) => {
    const newData = form.map((input) => {
      const {code, value, name} = input;
      if (name) {
        return {
          code,
          value,
          name,
        };
      }
      return {
        code,
        value,
      };
    });

    const newObject = Object.assign(
      {},
      ...newData.map((item) =>
        !item.name
          ? {[item.code]: item.value}
          : {[item.code]: {link: item.value, name: item.name}}
      )
    );

    return newObject;
  };

  const handleFinalizing = (value) => {
    setFinalizing(value);
  };
  const handleSuccessModal = (value) => {
    setSuccessModalOpen(value);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e && e.preventDefault();
      let numOfErrors = 0;
      let numOfValues = 0;
      form[position].forms.forEach((item) => {
        item.isError && numOfErrors++;
        item.value && numOfValues++;
      });

      const lengthForms = form[position].forms.length;

      if (isSubmitted) {
        if (numOfErrors === 0 && numOfValues === lengthForms) {
          if (position < 3) {
            if (companyName && isRejected) {
              const finalForm = {
                email: user.email,
                internshipDetails: {
                  ...internshipDetails,
                  ...convertForm(
                    [...form[0].forms].filter(
                      (item) => item.id === "starting-date"
                    )
                  ),
                },
                schoolDetails: convertForm([...form[1].forms]),
                scheduleDetails: convertForm([...form[2].forms]),
                verification: {
                  hasSentVerification: true,
                  isVerified: false,
                  isRejected: false,
                },
              };

              dispatch(requestVerification(finalForm));
            } else {
              const finalForm = {
                email: user.email,
                internshipDetails: convertForm([...form[0].forms]),
                schoolDetails: convertForm([...form[1].forms]),
                scheduleDetails: convertForm([...form[2].forms]),
                verification: {
                  hasSentVerification: true,
                  isVerified: false,
                  isRejected: false,
                },
              };

              dispatch(requestVerification(finalForm));
            }
          }
        }
      }
    },
    [form, dispatch, isSubmitted, position, user.email]
  );

  const checkProgram = useCallback(
    (department, mainIndex, index) => {
      const newForm = [...form];
      switch (department) {
        case "Bachelor of Science in Information Technology":
          newForm[mainIndex].forms[index + 3].value = "640";
          return;
        case "Bachelor of Science in Computer Science":
          newForm[mainIndex].forms[index + 3].value = "240";
          return;
        case "Bachelor of Library Information System":
          newForm[mainIndex].forms[index + 3].value = "240";
          return;
        case "Bachelor of Science in Computer Engineering":
          newForm[mainIndex].forms[index + 3].value = "240";
          return;
        case "Bachelor of Science in Electrical Engineering":
          newForm[mainIndex].forms[index + 3].value = "240";
          return;
        case "Bachelor of Science in Electronics and Communications Engineering":
          newForm[mainIndex].forms[index + 3].value = "240";
          return;
        default:
          return;
      }
    },
    [form]
  );

  const checkCompletion = (index) => {
    if (companyName && isRejected) {
      if (position >= 1) {
        let numOfErrors = 0;
        let numOfValues = 0;

        form[position].forms.forEach((item) => {
          item.isError && numOfErrors++;
          item.value && numOfValues++;
        });

        const lengthForms = form[position].forms.length;
        const newSteps = [...steps];

        console.log(numOfErrors, numOfValues, lengthForms);

        if (numOfErrors === 0 && numOfValues === lengthForms) {
          newSteps[index].isCompleted = true;
          setSteps(newSteps);
        } else {
          newSteps[index].isCompleted = false;
          setSteps(newSteps);
        }
      } else {
        let numOfErrors = 0;
        let numOfValues = 0;

        form[position].forms
          .filter((item) => item.id === "starting-date")
          .forEach((item) => {
            item.isError && numOfErrors++;
            item.value && numOfValues++;
          });

        const lengthForms = form[position].forms.filter(
          (item) => item.id === "starting-date"
        ).length;
        const newSteps = [...steps];

        console.log(numOfErrors, numOfValues, lengthForms);

        if (numOfErrors === 0 && numOfValues === lengthForms) {
          newSteps[index].isCompleted = true;
          setSteps(newSteps);
        } else {
          newSteps[index].isCompleted = false;
          setSteps(newSteps);
        }
      }
    } else {
      let numOfErrors = 0;
      let numOfValues = 0;
      form[position].forms.forEach((item) => {
        item.isError && numOfErrors++;
        item.value && numOfValues++;
      });

      const lengthForms = form[position].forms.length;
      const newSteps = [...steps];

      if (numOfErrors === 0 && numOfValues === lengthForms) {
        newSteps[index].isCompleted = true;
        setSteps(newSteps);
      } else {
        newSteps[index].isCompleted = false;
        setSteps(newSteps);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleImageView = () => {
    setImageOpen(!isImageOpen);
  };

  const deleteDuplicateFirebase = (imgName) => {
    const desertRef = ref(storage, imgName);

    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        console.log("file deleted");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  const handleNext = (e) => {
    e.preventDefault();
    let numOfErrors = 0;
    let numOfValues = 0;

    if (companyName && isRejected) {
      if (position >= 1) {
        form[position].forms.forEach((item) => {
          item.isError && numOfErrors++;
          item.value && numOfValues++;
        });

        const lengthForms = form[position].forms.length;

        if (numOfErrors === 0 && numOfValues === lengthForms) {
          if (position < 2) {
            setPosition((prev) => prev + 1);
          }
        }
      } else {
        form[position].forms
          .filter((item) => item.id === "starting-date")
          .forEach((item) => {
            item.isError && numOfErrors++;
            item.value && numOfValues++;
          });

        const lengthForms = form[position].forms.filter(
          (item) => item.id === "starting-date"
        ).length;

        if (numOfErrors === 0 && numOfValues === lengthForms) {
          console.log("test");

          if (position < 2) {
            setPosition((prev) => prev + 1);
          }
        }
      }
    } else {
      form[position].forms.forEach((item) => {
        item.isError && numOfErrors++;
        item.value && numOfValues++;
      });

      const lengthForms = form[position].forms.length;

      if (numOfErrors === 0 && numOfValues === lengthForms) {
        if (position < 2) {
          setPosition((prev) => prev + 1);
        }
      }
    }
  };

  const handleReturn = (e) => {
    e.preventDefault();
    if (position !== 0) {
      setPosition((prev) => prev - 1);
    }
  };

  const handleKeydown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
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

  const handleOnChange = useCallback(
    (value, group, index, mainIndex) => {
      const newForm = [...form];

      if (companyName && position === 0) {
        console.log("1");
        const inputField = newForm[mainIndex].forms[7].id;
        switch (inputField) {
          case "starting-date":
            const selectedDate = new Date(value);
            const dayOfWeek = selectedDate.getDay();

            if (dayOfWeek === 0 || dayOfWeek === 6) {
              newForm[mainIndex].forms[7].isError = true;
              newForm[mainIndex].forms[7].value = "";
            } else {
              newForm[mainIndex].forms[7].isError = false;
              newForm[mainIndex].forms[7].value = value;
            }

            setForm(newForm);
            checkCompletion(mainIndex);
            return;
        }
      } else {
        console.log("2");
        const inputField = newForm[mainIndex].forms[index].id;

        switch (inputField) {
          case "starting-date":
            const selectedDate = new Date(value);
            const dayOfWeek = selectedDate.getDay();

            // Check if the selected date is a weekend
            if (dayOfWeek === 0 || dayOfWeek === 6) {
              newForm[mainIndex].forms[index].isError = true;
              newForm[mainIndex].forms[index].value = "";
            } else {
              newForm[mainIndex].forms[index].isError = false;
              newForm[mainIndex].forms[index].value = value;
            }

            setForm(newForm);
            checkCompletion(mainIndex);
            return;
          case "company-name":
            value.length >= 2 && value.length <= 75
              ? (newForm[mainIndex].forms[index].isError = false)
              : (newForm[mainIndex].forms[index].isError = true);
            newForm[mainIndex].forms[index].value = value;
            setForm(newForm);
            checkCompletion(mainIndex);
            return;
          case "company-address":
            value.length >= 5 && value.length <= 100
              ? (newForm[mainIndex].forms[index].isError = false)
              : (newForm[mainIndex].forms[index].isError = true);
            newForm[mainIndex].forms[index].value = value;
            setForm(newForm);
            checkCompletion(mainIndex);
            return;
          case "supervisor":
            newForm[mainIndex].forms[index].value = value;
            const regex =
              /^(?=.{2,50}$)(?!(\s.*){3,})(?!\s{3,})[^\d]*(\s[^\d]*){0,2}$/;
            let isSuperValid = regex.test(value);
            if (isSuperValid) {
              newForm[mainIndex].forms[index].isError = false;
            } else {
              newForm[mainIndex].forms[index].isError = true;
              if (/\d/.test(value)) {
                newForm[mainIndex].forms[index].errorMessage =
                  "Supervisor name should not contain numbers";
              } else if (value.length < 2) {
                newForm[mainIndex].forms[index].errorMessage =
                  "Supervisor name should have at least 2 and maximum of 50 characters";
              } else if (/\s{3,}/.test(value)) {
                newForm[mainIndex].forms[index].errorMessage =
                  "Supervisor name should have at most 2 white spaces";
              }
            }
            setForm(newForm);
            checkCompletion(mainIndex);
            return;
          case "supervisor-contact":
          case "student-contact":
            newForm[mainIndex].forms[index].value = value;
            const passwordRegex = /^(09|\+639)\d{9}$/;
            let isConctactValid = passwordRegex.test(value);
            if (isConctactValid) {
              newForm[mainIndex].forms[index].isError = false;
            } else {
              newForm[mainIndex].forms[index].isError = true;
            }
            setForm(newForm);
            checkCompletion(mainIndex);
            return;
          case "program":
            newForm[mainIndex].forms[index].value = value;
            const programValue = newForm[mainIndex].forms[index].value;
            checkProgram(programValue, mainIndex, index);
            setForm(newForm);
            checkCompletion(mainIndex);
            return;
          case "student-number":
            const studentNumberRegex = /^A20200\d{4}$/;
            const isStudentNumbetValid = studentNumberRegex.test(value);
            isStudentNumbetValid
              ? (newForm[mainIndex].forms[index].isError = false)
              : (newForm[mainIndex].forms[index].isError = true);

            newForm[mainIndex].forms[index].value = value;
            setForm(newForm);
            checkCompletion(mainIndex);
            return;
          case "valid-id":
          case "logo":
            if (schoolDetails) {
              const {
                validID: {name},
              } = schoolDetails;
              // deleteDuplicateFirebase(name);
            }
            if (value) {
              const {name, type} = value;
              if (!type.includes("image")) {
                newForm[mainIndex].forms[index].isError = true;
                newForm[mainIndex].forms[index].errorMessage =
                  "Invalid file type";
                newForm[mainIndex].forms[index].value = "";
                setForm(newForm);
              } else {
                const imageName = `images/validID/${v4() + name}`;
                const imageRef = ref(storage, imageName);

                uploadBytes(imageRef, value)
                  .then((res) => {
                    getDownloadURL(res.ref)
                      .then((url) => {
                        newForm[mainIndex].forms[index].isError = false;
                        newForm[mainIndex].forms[index].link = url;
                        newForm[mainIndex].forms[index].value = url;
                        newForm[mainIndex].forms[index].name = imageName;
                        newForm[mainIndex].forms[index].isDisabled = true;
                        setForm(newForm);
                        checkCompletion(mainIndex);
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              }
            }
            return;
          case "schedule-type":
            if (value === "Regular") {
              newForm[mainIndex].forms[index].value = value;
              newForm[mainIndex].forms[index + 1].value = "8:00 AM";
              newForm[mainIndex].forms[index + 2].value = "5:00 PM";
              newForm[mainIndex].forms[index + 3].value = "Monday - Friday";
            } else {
              newForm[mainIndex].forms[index].value = value;
              newForm[mainIndex].forms[index + 1].value = "Not Specified";
              newForm[mainIndex].forms[index + 2].value = "Not Specified";
              newForm[mainIndex].forms[index + 3].value = "Not Specified";
            }
            let numOfErrors = 0;
            let numOfValues = 0;
            form[position].forms.forEach((item) => {
              item.isError && numOfErrors++;
              item.value && numOfValues++;
            });
            const lengthForms = form[position].forms.length;
            if (numOfErrors === 0 && numOfValues === lengthForms) {
              setComplete(true);
            }
            setForm(newForm);
            checkCompletion(mainIndex);
            return;
          case "description":
            if (
              value.length >= newForm[mainIndex].forms[index].minLength &&
              value.length <= newForm[mainIndex].forms[index].maxLength
            ) {
              newForm[mainIndex].forms[index].isError = false;
            } else {
              newForm[mainIndex].forms[index].isError = true;
            }

            newForm[mainIndex].forms[index].value = value;
            setForm(newForm);
            checkCompletion(mainIndex);
            return;
          case "email":
            const emailRegex =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let isValid = emailRegex.test(value);
            isValid
              ? (newForm[mainIndex].forms[index].isError = false)
              : (newForm[mainIndex].forms[index].isError = true);

            newForm[mainIndex].forms[index].value = value
              .slice(0)
              .toLowerCase();
            setForm(newForm);
            checkCompletion(mainIndex);
            return;
          default:
            newForm[mainIndex].forms[index].value = value;
            setForm(newForm);
            checkCompletion(mainIndex);
            return;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkProgram, form, position]
  );

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
        isVisible,
        link,
      } = item;
      switch (type) {
        case "date":
          const now = new Date();
          const year = now.getFullYear();
          const month = now.getMonth() + 1;
          const date = now.getDate();
          const minDate = `${year}-${month < 10 ? "0" : ""}${month}-${
            date < 10 ? "0" : ""
          }${date}`;
          const maxDate = "2023-12-31";

          return (
            <div className="input-contain" key={index}>
              <input
                min={minDate}
                max={maxDate}
                tabIndex={-1}
                disabled={isDisabled}
                required
                value={value}
                onChange={(e) =>
                  handleOnChange(e.target.value, group, index, mainIndex)
                }
                onKeyDown={handleKeydown}
                type={type}
                name={forInput}
              />
              <div className="placeholder-container">
                <label htmlFor={id} className={"placeholder-text active"}>
                  <div className="text">{forInput}</div>
                </label>
              </div>
              {isError && <p className="error-message">{errorMessage}</p>}
            </div>
          );
        case "email":
        case "text":
          return (
            <div className="input-contain" key={index}>
              <input
                onPaste={handlePaste}
                tabIndex={-1}
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
              <label htmlFor={id}>
                <h4>{forInput}:</h4>
                <input
                  disabled={isDisabled}
                  onChange={(e) =>
                    handleOnChange(e.target.files[0], group, index, mainIndex)
                  }
                  tabIndex={-1}
                  required
                  type="file"
                  name={id}
                  id={id}
                  accept="image/*"
                />
                {!isError && !value && <p>Select File</p>}
                {isError && (
                  <p
                    style={{color: "red", fontSize: "18px"}}
                    className="error-message"
                  >
                    {errorMessage}{" "}
                  </p>
                )}
                {link && <img onClick={handleImageView} src={link} alt={id} />}
              </label>
            </div>
          );
        case "select":
          const {options, placeholder} = item;
          const list = options.map((opt) => opt);
          return (
            <Select
              tabIndex={-1}
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
              tabIndex={-1}
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
              tabIndex={-1}
              className={isVisible ? "time" : "time not-visible"}
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
        case "scheduleType":
          const {scheduleType} = item;
          return (
            <Select
              tabIndex={-1}
              className="scheduleType"
              options={scheduleType}
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
        case "textArea":
          return (
            <div className="input-contain" key={index}>
              <textarea
                onPaste={handlePaste}
                tabIndex={-1}
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
              ></textarea>
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
        default:
          return null;
      }
    });
  };

  const renderEnrolledInputs = (arr) => {
    return arr.map((item, index) => {
      const {type, id, value, forInput, isError, errorMessage, link} = item;
      switch (type) {
        case "list":
        case "email":
        case "text":
          return (
            <div className="input-contain" key={index}>
              <input
                tabIndex={-1}
                disabled
                required
                value={value}
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
              <label htmlFor={id}>
                <h4>{forInput}:</h4>
                <input
                  disabled
                  tabIndex={-1}
                  required
                  type="file"
                  name={id}
                  id={id}
                  accept="image/*"
                />
                {!isError && !value && <p>Select File</p>}
                {isError && (
                  <p
                    style={{color: "red", fontSize: "18px"}}
                    className="error-message"
                  >
                    {errorMessage}{" "}
                  </p>
                )}
                <img onClick={handleImageView} src={value} alt={id} />
              </label>
            </div>
          );
        case "textArea":
          return (
            <div className="input-contain" key={index}>
              <textarea
                tabIndex={-1}
                disabled
                required
                value={value}
                type={type}
                name={forInput}
              ></textarea>
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
        default:
          return null;
      }
    });
  };

  const renderSteps = () => {
    return steps.map((item, index) => {
      const {step, isCompleted} = item;
      return (
        <div
          className={
            index === position ? `step-${step} active` : `step-${step} `
          }
          key={index}
        >
          {isCompleted ? (
            <span>
              <FaCheck />
            </span>
          ) : (
            step
          )}
        </div>
      );
    });
  };

  useEffect(
    (e) => {
      if (isSubmitted) {
        handleSubmit(e);
        handleSuccessModal(true);
        handleFinalizing(false);
      }
    },
    [isSubmitted, handleSubmit]
  );

  return (
    <section className="verification-container">
      {isFinalizing ? (
        <div className="overlay"></div>
      ) : isSuccessModalOpen ? (
        <div className="overlay"></div>
      ) : null}

      {isFinalizing && (
        <AreYouSureModal
          handleFinalizing={handleFinalizing}
          handleSubmit={handleSubmit}
          setSubmitted={setSubmitted}
        />
      )}

      <div className="greetings">
        <h1>Verification</h1>
      </div>
      {isImageOpen && (
        <div className="valid-id-modal">
          <img src={form[1].forms[1].value} alt={`valid-id`} />
          <button onClick={handleImageView}>Back</button>
        </div>
      )}

      <div className="verification-steps">
        <div className="steps-container">
          <div className="steps">{renderSteps()}</div>
          <h2>{form[position].group}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {companyName ? (
            <div
              className={
                position === 0
                  ? "internship-details"
                  : position === 2
                  ? "internship-details inactive-1"
                  : "internship-details inactive"
              }
            >
              <div className="forms-con">
                {renderEnrolledInputs(
                  convertObjectToFields({
                    ...internshipDetails,
                  })
                )}
                {renderInputs(
                  form[0].forms.filter((item) => item.id === "starting-date"),
                  "Internship Details",
                  0
                )}
              </div>
              <button tabIndex={-1} onClick={handleNext}>
                Next
              </button>
            </div>
          ) : (
            <div
              className={
                position === 0
                  ? "internship-details"
                  : position === 2
                  ? "internship-details inactive-1"
                  : "internship-details inactive"
              }
            >
              <div className="forms-con">
                {renderInputs(form[0].forms, "Internship Details", 0)}
              </div>
              <button tabIndex={-1} onClick={handleNext}>
                Next
              </button>
            </div>
          )}
          <div
            className={
              position === 1
                ? "student-details active"
                : position === 2
                ? "student-details inactive-1"
                : "student-details"
            }
          >
            <div className="forms-con">
              {renderInputs(form[1].forms, "Student Details", 1)}
            </div>
            <div className="btn-con">
              <button tabIndex={-1} onClick={handleReturn}>
                Back
              </button>
              <button tabIndex={-1} onClick={handleNext}>
                Next
              </button>
              {/* <button onClick={() => setNextPage(!atNextPage)}>Back</button> */}
            </div>
          </div>
          <div
            className={
              position === 2
                ? "schedule-details active-1"
                : position === 1
                ? "schedule-details inactive-2"
                : "schedule-details"
            }
          >
            <div className="forms-con">
              {renderInputs(form[2].forms, "Schedule Details", 2)}
            </div>
            <div className="btn-con">
              <button tabIndex={-1} onClick={handleReturn}>
                Back
              </button>
              <button
                tabIndex={-1}
                disabled={isComplete ? false : true}
                onClick={handleFinalizing}
              >
                Submit Verification
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
});

export default Verification;
