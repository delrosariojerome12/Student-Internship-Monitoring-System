import React, {useState} from "react";
import img from "../../assets/img/login-bg.svg";
import logo from "../../assets/img/logo.svg";
import {FaUserAlt, FaLock, FaEye, FaEyeSlash} from "react-icons/fa";
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import {useRef} from "react";

const Login = () => {
  const [hasUsername, setHasUsername] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const passwordType = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
    if (passwordType.current.type === "password") {
      passwordType.current.type = "text";
    } else {
      passwordType.current.type = "password";
    }
  };
  console.log(passwordType.current);
  const handleOnchange = (value, input) => {
    switch (input) {
      case "username":
        return value ? setHasUsername(true) : setHasUsername(false);

      case "password":
        return value ? setHasPassword(true) : setHasPassword(false);
      default:
    }
  };
  return (
    <section className="login">
      <div className="bg-container"></div>
      <section className="login-container">
        <div className="left-card">
          <img src={logo} alt="adwadwadadadda" />
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <IconContext.Provider
              value={{color: "#f1faee", className: "icons"}}
            >
              <label htmlFor="username">
                <span>
                  <FaUserAlt />
                </span>
                <input
                  style={
                    hasUsername ? {padding: "0.5rem 0.5rem 0.5rem 6rem"} : null
                  }
                  onChange={(e) => handleOnchange(e.target.value, e.target.id)}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                />
              </label>
              <label htmlFor="password">
                <span>
                  <FaLock />
                </span>
                <span
                  onClick={() => handleShowPassword()}
                  className="show-password"
                >
                  {isPasswordShown ? <FaEye /> : <FaEyeSlash />}
                </span>
                <input
                  ref={passwordType}
                  style={
                    hasPassword ? {padding: "0.5rem 0.5rem 0.5rem 6rem"} : null
                  }
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => handleOnchange(e.target.value, e.target.id)}
                  placeholder="Password"
                />
              </label>

              <div className="options">
                <label htmlFor="remember-me">
                  <input type="checkbox" name="remeber-me" id="remember-me" />
                  <p>Remember Me</p>
                </label>
                <a href="https://web.facebook.com/?_rdc=1&_rdr">
                  Forgot Password
                </a>
              </div>

              <button type="submit">Login</button>
            </IconContext.Provider>
          </form>
          <Link to={"/account/signin"}>Create Account</Link>
        </div>
        <div className="right-card">
          <img src={img} alt="" />
        </div>
      </section>
    </section>
  );
};

export default Login;
