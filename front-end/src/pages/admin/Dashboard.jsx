import React, {useState} from "react";
import {FaUserAlt, FaLock, FaEye, FaEyeSlash, FaCheck} from "react-icons/fa";
import {GrMail} from "react-icons/gr";
import {IconContext} from "react-icons";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../../Firebase";
import {v4} from "uuid";
import {
  handleCreateUser,
  handleCloseSuccess,
} from "../../features/user/userReducer";
import {useDispatch, useSelector} from "react-redux";

const Dashboard = React.memo(() => {
  const {isError, errorMessage, isLoading, createdSuccessful} = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const [form, setForm] = useState([
    {
      forInput: "Profile Image",
      type: "file",
      id: "profile-image",
      value:
        "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png",
      IconType: FaUserAlt,
      isError: false,
      errorMessage: "Image should be less than",
      hasEyeIcon: false,
      code: "profileImage",
      isVisible: true,
      isDisabled: false,
    },
    {
      forInput: "Role",
      type: "radio",
      id: "role",
      value: "",
      IconType: FaUserAlt,
      isError: false,
      errorMessage: "Choose a role",
      hasEyeIcon: false,
      code: "role",
      isVisible: true,
      choices: ["administrator", "coordinator"],
    },
    {
      forInput: "First Name",
      type: "text",
      id: "first-name",
      value: "",
      IconType: FaUserAlt,
      isError: false,
      errorMessage: "First name must be between 3 and 20 characters long",
      hasEyeIcon: false,
      code: "firstName",
      isVisible: true,
    },
    {
      forInput: "Last Name",
      type: "text",
      id: "last-name",
      value: "",
      IconType: FaUserAlt,
      isError: false,
      errorMessage: "Last name must be between 3 and 20 characters long",
      hasEyeIcon: false,
      code: "lastName",
      isVisible: true,
    },
    {
      forInput: "Email",
      type: "email",
      id: "email",
      value: "",
      IconType: GrMail,
      isError: false,
      errorMessage: "Please provide valid email",
      hasEyeIcon: false,
      code: "email",
      isVisible: true,
    },
    {
      forInput: "Password",
      type: "password",
      id: "password",
      value: "",
      IconType: FaLock,
      isError: false,
      errorMessage:
        "Password must have: Atleast 1 uppercase, 1 lowercase, 1 number, 1 special characters and minimum of 8 characters",
      requirements: [],
      hasEyeIcon: true,
      code: "password",
      isVisible: true,
      hasShownPassword: false,
    },
    {
      forInput: "Confirm Password",
      type: "password",
      id: "confirm-password",
      value: "",
      IconType: FaLock,
      isError: false,
      errorMessage: "Password are not the same",
      hasEyeIcon: true,
      hasShownPassword: false,
      isVisible: false,
    },
  ]);

  const [isComplete, setComplete] = useState(false);

  const checkCompletion = () => {
    let numOfErrors = 0;
    let numOfValues = 0;

    form.forEach((item) => {
      item.isError && numOfErrors++;
      item.value && numOfValues++;
    });

    const lengthForms = form.length;

    if (numOfErrors === 0 && numOfValues - 1 === lengthForms - 1) {
      setComplete(true);
    } else {
      setComplete(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleOnChange = (value, index, input) => {
    const data = [...form];
    switch (input) {
      case "Role":
        data[index].value = value;
        setForm(data);
        checkCompletion();
        return;
      case "First Name":
        data[index].value = value;
        let firstNameRegex = /(\b[a-z](?!\s))/g;
        value.length > 2 && value.length < 20
          ? (data[index].isError = false)
          : (data[index].isError = true);

        let firstNameValue = data[index].value.replace(firstNameRegex, (x) =>
          x.charAt(0).toUpperCase()
        );
        data[index].value = firstNameValue;
        setForm(data);
        checkCompletion();
        return;
      case "Last Name":
        data[index].value = value;

        value.length > 2 && value.length < 20
          ? (data[index].isError = false)
          : (data[index].isError = true);
        data[index].value =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        setForm(data);
        checkCompletion();

        return;
      case "Email":
        data[index].value = value;
        const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = emailRegex.test(value);
        isValid ? (data[index].isError = false) : (data[index].isError = true);
        data[index].value = data[index].value.slice(0).toLowerCase();
        setForm(data);
        checkCompletion();

        return;
      case "Password":
        data[index].value = value;
        const passwordRegex =
          /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_.-]).*$/;
        let isPasswordValid = passwordRegex.test(value);
        if (isPasswordValid) {
          data[index].isError = false;
          data[index + 1].isVisible = true;
        } else {
          data[index].isError = true;
          data[index + 1].isVisible = false;
          data[index + 1].value = "";
        }
        setForm(data);
        checkCompletion();

        return;
      case "Confirm Password":
        data[index].value = value;
        const password = form[index - 1].value;
        const confirmPassword = form[index];
        const confirmPasswordRegex =
          /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;
        let isConfirmPasswordValid = confirmPasswordRegex.test(value);
        password === confirmPassword.value && isConfirmPasswordValid
          ? (confirmPassword.isError = false)
          : (confirmPassword.isError = true);

        setForm(data);
        checkCompletion();

        return;
      case "Profile Image":
        if (value) {
          const {name, type} = value;
          if (!type.includes("image")) {
            console.log("error");
            data[index].isError = true;
            data[index].errorMessage = "Invalid File Type";
            setForm(data);
          } else {
            const imageRef = ref(
              storage,
              `images/users/profileImages/${v4() + name}`
            );
            uploadBytes(imageRef, value)
              .then((res) => {
                getDownloadURL(res.ref)
                  .then((url) => {
                    data[index].isError = false;
                    data[index].value = url;
                    data[index].isDisabled = true;
                    setForm(data);
                    checkCompletion();
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          }
        }
        return;
      default:
        break;
    }
  };

  const handleShowPassword = (index) => {
    const newForm = [...form];
    newForm[index].hasShownPassword
      ? (newForm[index].hasShownPassword = false)
      : (newForm[index].hasShownPassword = true);

    newForm[index].type === "password"
      ? (newForm[index].type = "text")
      : (newForm[index].type = "password");
    setForm(newForm);
  };

  const renderEyeIcon = (condition, index) => {
    return condition ? (
      <FaEye onClick={() => handleShowPassword(index)} />
    ) : (
      <FaEyeSlash onClick={() => handleShowPassword(index)} />
    );
  };

  const renderInputs = () => {
    return form.map((inputs, index) => {
      const {
        forInput,
        id,
        type,
        value,
        IconType,
        isError,
        errorMessage,
        hasEyeIcon,
        hasShownPassword,
        isVisible,
        code,
        isDisabled,
        choices,
      } = inputs;

      switch (type) {
        case "radio":
          return (
            <div className="choice-contain" key={index}>
              <div className="placeholder-container">
                <label
                  htmlFor={id}
                  className={
                    value ? "placeholder-text active" : "placeholder-text"
                  }
                >
                  <div className={isError ? "text icons-error" : "text"}>
                    <span>
                      <IconType className={isError ? "icons-error" : "icons"} />
                    </span>
                    {forInput}
                  </div>
                </label>
              </div>
              <h4>Select Role</h4>
              {choices.map((radioValue, index) => {
                {
                  return (
                    <div className="choices" key={index}>
                      <input
                        type={type}
                        name={id}
                        id={`${id}${radioValue}`}
                        className={isError ? "input-error" : null}
                        value={radioValue}
                        required
                        onChange={(e) =>
                          handleOnChange(e.target.value, 1, forInput)
                        }
                        autoComplete={hasEyeIcon ? "true" : null}
                      />
                      <label htmlFor={`${id}${radioValue}`}>{radioValue}</label>
                    </div>
                  );
                }
              })}
            </div>
          );
        case "text":
        case "email":
        case "password":
          return (
            <div className="input-contain" key={index}>
              <input
                type={type}
                name={code}
                id={code}
                className={isError ? "input-error" : null}
                value={value}
                required
                onChange={(e) =>
                  handleOnChange(e.target.value, index, forInput)
                }
                autoComplete={hasEyeIcon ? "true" : null}
              />
              <div className="placeholder-container">
                <label
                  htmlFor={id}
                  className={
                    value ? "placeholder-text active" : "placeholder-text"
                  }
                >
                  <div className={isError ? "text icons-error" : "text"}>
                    <span>
                      <IconType className={isError ? "icons-error" : "icons"} />
                    </span>
                    {forInput}
                  </div>
                </label>
              </div>
              {isError && <p className="error-message">{errorMessage}</p>}
              {hasEyeIcon && (
                <div className="eye-container">
                  {renderEyeIcon(hasShownPassword, index)}
                </div>
              )}
            </div>
          );
        case "file":
          return (
            <div key={index} className="img-input">
              <label htmlFor={id}>
                <div className="profile-con">
                  <img src={value} alt="profile" />
                </div>
                {isError ? (
                  <p style={{color: "red"}}>{errorMessage}</p>
                ) : value.includes("firebase") ? (
                  <p>
                    Profile Selected
                    <FaCheck />
                  </p>
                ) : (
                  <p>Select Profile</p>
                )}
                <input
                  disabled={isDisabled}
                  type="file"
                  name={forInput}
                  id={id}
                  accept="image/*"
                  onChange={(e) =>
                    handleOnChange(e.target.files[0], index, forInput)
                  }
                />
              </label>
            </div>
          );
        default:
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let x = 0;
    form.forEach((item) => {
      item.isError && x++;
    });
    // api send
    if (x === 0) {
      dispatch(handleCreateUser({form}));
    }
  };

  return (
    <section className="admin-dashboard">
      <header>
        <h1>Hello Admin</h1>
        <h3>Welcome Back!</h3>
      </header>
      <section className="content">
        <header>
          <h2>Create Account</h2>
          <div className="brief-text">
            <h5>
              The purpose of this tab is to create new accounts for the admin
              and coordinator
            </h5>
          </div>
        </header>
        <form className="form-container" onSubmit={handleSubmit}>
          <IconContext.Provider value={{className: "icons"}}>
            {renderInputs()}
            <button
              style={
                isComplete
                  ? {opacity: "1"}
                  : isLoading
                  ? {opacity: ".7", pointerEvents: "none"}
                  : {opacity: ".7", pointerEvents: "none"}
              }
              type="submit"
            >
              {isLoading ? "Creating User..." : "Create User"}
            </button>
          </IconContext.Provider>
        </form>
      </section>
      {createdSuccessful && (
        <>
          <div
            className="overlay"
            onClick={() => dispatch(handleCloseSuccess())}
          >
            <h3>Create Successful!</h3>
          </div>
          <div className="success-modal">
            <button onClick={() => dispatch(handleCloseSuccess())}>
              Close
            </button>
          </div>
        </>
      )}
    </section>
  );
});

export default Dashboard;
