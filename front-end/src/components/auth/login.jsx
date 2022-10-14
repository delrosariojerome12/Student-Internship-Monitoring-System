import React from "react";
import img from "../../assets/img/bg.png";
import logo from "../../assets/img/logo.svg";
import bgWaves from "../../assets/img/bg-waves.svg";
import {FaUserAlt, FaLock} from "react-icons/fa";
import {IconContext} from "react-icons";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main className="login">
      {/* <img className="bg-waves" src={bgWaves} alt="" /> */}
      <section className="login-container">
        <div className="left-card">
          <img src={logo} alt="" />
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <IconContext.Provider value={{color: "#f1faee"}}>
              <label htmlFor="username">
                <span>
                  <FaUserAlt />
                </span>
                <input
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
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </label>

              <div className="options">
                <label htmlFor="remember-me">
                  <input type="checkbox" name="remeber-me" id="remember-me" />
                  <p>Remember Me</p>
                </label>
                <a href="#">Forgot Password</a>
              </div>

              <button type="submit">Login</button>
            </IconContext.Provider>
          </form>
          <a href="#">Create Account</a>
        </div>
        <div className="right-card">
          <img src={img} alt="" />
        </div>
      </section>
    </main>
  );
};

export default Login;
