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
      errorMessage: "First name must be between 1 and 20 characters long",
      hasEyeIcon: false,
    },
    {
      forInput: "Last Name",
      type: "text",
      id: "last-name",
      value: "",
      IconType: FaUserAlt,
      isError: false,
      errorMessage: "Last name must be between 1 and 20 characters long",
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
        "Your password must: Contain at least 8 characters Contain unique characters, numbers, or symbols Not contain your email address",
      hasEyeIcon: true,
    },
    {
      forInput: "Confirm Password",
      type: "password",
      id: "confirm-password",
      value: "",
      IconType: FaCheckCircle,
      isError: false,
      errorMessage: "Password are not the same",
      hasEyeIcon: true,
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleOnChange = (value, index) => {
    const data = [...form];
    data[index].value = value;
    value ? (data[index].isError = false) : (data[index].isError = true);
    setForm(data);
    handleError(value, index);
  };

  const handleError = useCallback(
    debounce((value, index) => {
      const data = [...form];
      //verify input
      value ? (data[index].isError = false) : (data[index].isError = true);
      setForm(data);
    }, 1000),
    []
  );

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
                    onChange={(e) => handleOnChange(e.target.value, index)}
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
