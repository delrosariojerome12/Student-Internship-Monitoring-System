import React, {useState, useCallback} from "react";
import {debounce} from "lodash";
import {Link} from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import {
  FaUserAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";
import {GrMail} from "react-icons/gr";
import {IconContext} from "react-icons";

const Signin = () => {
  const [form, setForm] = useState([
    {
      forInput: "First Name",
      type: "text",
      id: "first-name",
      value: "",
      IconType: FaUserAlt,
      isError: false,
      errorMessage: "First name must be between 3 and 20 characters long",
      hasEyeIcon: false,
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
    },
    {
      forInput: "Password",
      type: "password",
      id: "password",
      value: "",
      IconType: FaLock,
      isError: false,
      errorMessage:
        "Your password must: Contain unique characters, numbers, or symbols Not contain your email address",
      hasEyeIcon: true,
      hasShownPassword: false,
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
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
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleOnChange = (value, index, input) => {
    const data = [...form];
    data[index].value = value;
    switch (input) {
      case "First Name":
        value.length > 2 && value.length < 20
          ? (data[index].isError = false)
          : (data[index].isError = true);
        setForm(data);
        return;
      case "Last Name":
        value.length > 2 && value.length < 20
          ? (data[index].isError = false)
          : (data[index].isError = true);
        setForm(data);
        return;
      case "Email":
        const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = emailRegex.test(value);
        isValid ? (data[index].isError = false) : (data[index].isError = true);
        setForm(data);
        return;
      case "Password":
        const passswordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/;
        let isPasswordValid = passswordRegex.test(value);
        isPasswordValid
          ? (data[index].isError = false)
          : (data[index].isError = true);
        setForm(data);
        return;
      case "Confirm Password":
        // compare password
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

  return (
    <section className="signin">
      <section className="bg-container"></section>
      <section className="card-container">
        <header>
          <img src={logo} alt="" />
          <h1>Create Your Account</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <IconContext.Provider value={{color: "#000", className: "icons"}}>
            {form.map((inputs, index) => {
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
                pattern,
              } = inputs;
              return (
                <div className="input-contain" key={index}>
                  <input
                    type={type}
                    name={forInput}
                    id={id}
                    className={isError ? "input-error" : null}
                    // pattern={pattern ? pattern : null}
                    value={value}
                    required
                    onChange={(e) =>
                      handleOnChange(e.target.value, index, forInput)
                    }
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
                          <IconType
                            className={isError ? "icons-error" : "icons"}
                          />
                        </span>
                        {forInput}
                      </div>
                    </label>
                  </div>
                  {isError && <p className="error-message">{errorMessage}</p>}
                  <div className="eye-container">
                    {hasEyeIcon && renderEyeIcon(hasShownPassword, index)}
                  </div>
                </div>
              );
            })}
            <span>
              <p>Already have an account?</p>
              <Link to="/account/login">Log in</Link>
            </span>
            <button type="submit">Signin</button>
          </IconContext.Provider>
        </form>
      </section>
    </section>
  );
};

export default Signin;
