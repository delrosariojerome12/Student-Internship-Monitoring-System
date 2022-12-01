import React, {useState, useCallback, useEffect} from "react";
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
import {useNavigate} from "react-router-dom";
// import {signInWithGoogle} from "../../Firebase";
import {useSelector, useDispatch} from "react-redux";
import {handleLogin} from "../../features/user/userReducer";

const Login = () => {
  const dispatch = useDispatch();
  const {isError, errorMessage, isLoading, user} = useSelector(
    (state) => state.user
  );

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
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const refPassword = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(handleLogin(form));
  };

  const handleOnChange = (value, index) => {
    const data = [...form];
    data[index].value = value;
    value ? (data[index].isError = false) : (data[index].isError = true);
    setForm(data);
    // handleError(value, index);
  };

  // const handleError =
  //   // eslint-disable-next-line
  //   useCallback(
  //     debounce((value, index) => {
  //       const data = [...form];
  //       //verify input
  //       value ? (data[index].isError = false) : (data[index].isError = true);
  //       setForm(data);
  //     }, 1000),
  //     []
  //   );

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
          {isError && <h3 style={{color: "red"}}>{errorMessage}</h3>}
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
