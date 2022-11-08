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
import axios from "axios";
import {useNavigate} from "react-router-dom";
// import {signInWithGoogle} from "../../Firebase";

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
      code: "email",
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
      code: "password",
    },
  ]);
  const [isLoginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const refPassword = useRef();
  const navigate = useNavigate();

  const convertForm = () => {
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
    try {
      const url = "http://localhost:5000/auth/login";
      const {data: res} = await axios.post(url, convertForm());
      localStorage.setItem("token", res.token);
      console.log(res);
      navigate("/dashboard");
    } catch (error) {
      const {msg} = error.response.data;
      setLoginError(true);
      setErrorMessage(msg);
    }
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
              autoComplete={hasEyeIcon ? "true" : null}
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
              className={value ? "placeholder-text active" : "placeholder-text"}
            >
              <div className={"text"}>
                <span>
                  <IconType className={"icons"} />
                </span>
                {forInput}
              </div>
            </label>
          </div>
          <div className="eye-container">{hasEyeIcon && renderEyeIcon()}</div>
        </div>
      );
    });
  };

  return (
    <section className="login">
      <section className="card-container">
        <header>
          <img src={logo} alt="" />
          <h1>Login</h1>
          {isLoginError && <h3 style={{color: "red"}}>{errorMessage}</h3>}
        </header>
        <form onSubmit={handleSubmit}>
          <IconContext.Provider value={{color: "#000", className: "icons"}}>
            {renderInputs()}
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
