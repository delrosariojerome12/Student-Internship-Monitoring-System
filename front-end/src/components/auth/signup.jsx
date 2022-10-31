import React, {useState, useCallback} from "react";
import {Link, redirect, useNavigate} from "react-router-dom";
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

const Signup = () => {
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
      requirements: [],
      hasEyeIcon: true,
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
    },
  ]);
  const [isSignupError, setSignupError] = useState(false);

  const navigate = useNavigate();
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
        const password = form[index - 1].value;
        const confirmPassword = form[index];
        password === confirmPassword.value
          ? (confirmPassword.isError = false)
          : (confirmPassword.isError = true);
        setForm(data);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    let x = 0;
    form.forEach((item) => {
      item.isError && x++;
    });
    // api send
    if (x === 0) {
      try {
        console.log("api request");
        // redirect("/dashboard");
        navigate("/dashboard");
      } catch (error) {
        // clears field
        // send error
        setSignupError(true);
        const newForm = form.map((input) => {
          input.value = "";
          return {...input};
        });
        setForm(newForm);
      }
    }
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
      } = inputs;
      return (
        <div className="input-contain" key={index}>
          <input
            type={type}
            name={forInput}
            id={id}
            className={isError ? "input-error" : null}
            value={value}
            required
            onChange={(e) => handleOnChange(e.target.value, index, forInput)}
          />
          <div className="placeholder-container">
            <label
              htmlFor={id}
              className={value ? "placeholder-text active" : "placeholder-text"}
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
          <div className="eye-container">
            {hasEyeIcon && renderEyeIcon(hasShownPassword, index)}
          </div>
        </div>
      );
    });
  };

  return (
    <section className="signin">
      <section className="bg-container"></section>
      <section className="card-container">
        <header>
          <img src={logo} alt="" />
          <h1>Create Your Account</h1>
          {isSignupError && <h1>has error</h1>}
        </header>
        <form onSubmit={handleSubmit}>
          <IconContext.Provider value={{color: "#000", className: "icons"}}>
            {renderInputs()}
            <span>
              <p>Already have an account?</p>
              <Link to="/account/login">Log in</Link>
            </span>
            <button type="submit">Sign up</button>
          </IconContext.Provider>
        </form>
      </section>
    </section>
  );
};

export default Signup;
