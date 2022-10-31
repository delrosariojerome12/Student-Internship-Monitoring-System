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
import {useRef} from "react";

const Login = () => {
  const [form, setForm] = useState([
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
  ]);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const refPassword = useRef();

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

  const handleError =
    // eslint-disable-next-line
    useCallback(
      debounce((value, index) => {
        const data = [...form];
        //verify input
        value ? (data[index].isError = false) : (data[index].isError = true);
        setForm(data);
      }, 1000),
      []
    );

  const handleShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
    if (refPassword.current.type === "password") {
      refPassword.current.type = "text";
    } else {
      refPassword.current.type = "password";
    }
  };

  const renderEyeIcon = () => {
    return isPasswordShown ? (
      <FaEye onClick={handleShowPassword} />
    ) : (
      <FaEyeSlash onClick={handleShowPassword} />
    );
  };

  return (
    <section className="login">
      <section className="card-container">
        <header>
          <img src={logo} alt="" />
          <h1>Login</h1>
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
              } = inputs;
              return (
                <div className="input-contain" key={index}>
                  {hasEyeIcon ? (
                    <input
                      ref={refPassword}
                      type={type}
                      name={forInput}
                      id={id}
                      value={value}
                      required
                      onChange={(e) => handleOnChange(e.target.value, index)}
                    />
                  ) : (
                    <input
                      type={type}
                      name={forInput}
                      id={id}
                      // className={isError ? "input-error" : null}
                      value={value}
                      required
                      onChange={(e) => handleOnChange(e.target.value, index)}
                    />
                  )}
                  <div className="placeholder-container">
                    <label
                      htmlFor={id}
                      className={
                        value ? "placeholder-text active" : "placeholder-text"
                      }
                    >
                      <div className={"text"}>
                        <span>
                          <IconType className={"icons"} />
                        </span>
                        {forInput}
                      </div>
                    </label>
                  </div>
                  <div className="eye-container">
                    {hasEyeIcon && renderEyeIcon()}
                  </div>
                </div>
              );
            })}
            <span>
              <p>Already have an account?</p>
              <Link to="/account/signup">Sign up</Link>
            </span>
            <button type="submit">Login</button>
          </IconContext.Provider>
        </form>
      </section>
      <section className="bg-container"></section>
    </section>
  );
};

export default Login;
