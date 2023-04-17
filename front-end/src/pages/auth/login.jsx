/** @format */

import React, {useState} from "react";
import {Link} from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import {FaLock, FaEye, FaEyeSlash} from "react-icons/fa";
import {GrMail} from "react-icons/gr";
import {IconContext} from "react-icons";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {
  handleLogin,
  handleForgetModal,
  forgotPassword,
  verifyResetCode,
  handleClosePasswordChanged,
} from "../../features/user/userReducer";
import ResetForm from "../../components/utils/ResetForm";
const Login = React.memo(() => {
  const dispatch = useDispatch();
  const {
    isError,
    errorMessage,
    isLoading,
    isForgotModalOpen,
    isSuccessResetSent,
    resetErrorMessage,
    isResetError,
    isLoadingReset,
    isVerifyError,
    isVerifyLoading,
    isCodeVerified,
    isPasswordChangeSuccess,
  } = useSelector((state) => state.user);

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
  const [isComplete, setComplete] = useState(false);
  const refPassword = useRef();
  const [verifyEmail, setVerifyEmail] = useState("");

  const [resetCode, setResetCode] = useState(["", "", "", ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(handleLogin(form));
  };

  const checkCompletion = () => {
    let numOfErrors = 0;
    let numOfValues = 0;

    form.forEach((item) => {
      item.isError && numOfErrors++;
      item.value && numOfValues++;
    });

    const lengthForms = form.length;

    if (numOfErrors === 0 && numOfValues === lengthForms) {
      setComplete(true);
    } else {
      setComplete(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleOnChange = (value, index) => {
    const data = [...form];
    data[index].value = value;
    value ? (data[index].isError = false) : (data[index].isError = true);
    setForm(data);
    // handleError(value, index);
    if (index === 0) {
      data[index].value = data[index].value.slice(0).toLowerCase();
    }
    checkCompletion();
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
      const {forInput, id, type, value, IconType, hasEyeIcon} = inputs;
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

  const handleOTP = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({email: verifyEmail}));
  };

  const handleResetChange = (index, value) => {
    value = value.replace(/\D/g, "").slice(0, 1);

    setResetCode((prevVerificationCode) => {
      const newResetCode = [...prevVerificationCode];
      newResetCode[index] = value;
      return newResetCode;
    });

    if (value) {
      const nextIndex = index + 1;
      if (nextIndex < resetCode.length) {
        document.getElementById(`verification-code-${nextIndex}`).focus();
      }
    }
  };

  const handleVerifyReset = (e) => {
    e.preventDefault();
    const code = resetCode.join("");
    console.log(`Verifying code: ${code}`);
    dispatch(verifyResetCode({email: verifyEmail, code}));
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
              <p>Doesn't have an account?</p>
              <Link to="/account/signup">Sign up</Link>
              <button
                onClick={() => {
                  dispatch(handleForgetModal());
                }}
                className="forgot-btn"
                type="button"
              >
                Forgot Password?
              </button>
            </span>
            <button
              style={
                isComplete
                  ? {opacity: "1"}
                  : isLoading
                  ? {pointerEvents: "none", opacity: ".7"}
                  : {opacity: ".7", pointerEvents: "none"}
              }
              type="submit"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </IconContext.Provider>
        </form>
      </section>
      <section className="bg-container"></section>

      {isForgotModalOpen && (
        <>
          <div className="overlay"></div>
          <div className="forgot-modal">
            <h2>Reset Password</h2>
            {isResetError && (
              <h4 className="error-text">{resetErrorMessage}</h4>
            )}
            {isSuccessResetSent && !isResetError && (
              <h4>Code Successfully Sent</h4>
            )}

            <form onSubmit={handleOTP}>
              <label
                htmlFor="forgot-email"
                className={
                  verifyEmail ? "placeholder-text active" : "placeholder-text"
                }
              >
                <div className={"text"}>
                  <h3>Email:</h3>
                </div>
              </label>
              <input
                disabled={isVerifyLoading}
                placeholder="example@gmail.com"
                required
                type="email"
                name="forgot-email"
                id="forgot-email"
                value={verifyEmail}
                onChange={(e) => {
                  setVerifyEmail(e.target.value);
                }}
              />
            </form>
            {isSuccessResetSent && !isResetError && (
              <form onSubmit={handleVerifyReset} className="send-code">
                <h2>Enter Your Code here</h2>
                <label>
                  {resetCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`verification-code-${index}`}
                      type="text"
                      value={digit}
                      maxLength="1"
                      onChange={(e) => handleResetChange(index, e.target.value)}
                    />
                  ))}
                </label>

                <button
                  style={
                    resetCode.filter((item) => item.length > 0).length !== 4
                      ? {pointerEvents: "none", opacity: 0.5}
                      : {
                          opacity: 1,
                        }
                  }
                  disabled={
                    resetCode.filter((item) => item.length > 0).length !== 4
                      ? true
                      : false
                  }
                  type="submit"
                >
                  {isVerifyLoading ? "Verifying..." : "Verify"}
                </button>
                {isVerifyError && <h2>Invalid Code!</h2>}
              </form>
            )}

            <a
              style={isLoadingReset ? {pointerEvents: "none"} : null}
              href="#"
              onClick={handleOTP}
              type="submit"
            >
              {isLoadingReset
                ? "Sending..."
                : isSuccessResetSent
                ? "Resend Code"
                : "Send Code"}
            </a>
          </div>
        </>
      )}
      {isCodeVerified && <ResetForm email={verifyEmail} />}
      {isPasswordChangeSuccess && (
        <>
          <div className="overlay"></div>
          <div className="success-modal">
            <h1>Password Changed Successfully</h1>
            <button onClick={() => dispatch(handleClosePasswordChanged())}>
              Close
            </button>
          </div>
        </>
      )}
    </section>
  );
});

export default Login;
