import React from "react";
import logo from "../../assets/img/logo.svg";
import img from "../../assets/img/secure-login.svg";
import {FaUserAlt, FaLock, FaEye, FaEyeSlash} from "react-icons/fa";
import {IconContext} from "react-icons";

const Signin = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="auth-container signin">
      <section className="bg-container"></section>
      <section className="signin card-container">
        <div className="left-card">
          <img src={img} alt="bg.img" />
        </div>
        <div className="right-card">
          <img src={logo} alt="" />
          <h1>Signin</h1>
          <form onSubmit={handleSubmit}>
            <IconContext.Provider
              value={{color: "#f1faee", className: "icons"}}
            >
              <label htmlFor="first-name">
                <span>
                  <FaUserAlt />
                </span>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  placeholder="First name"
                />
              </label>
              <label htmlFor="last-Name">
                <span>
                  <FaLock />
                </span>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  placeholder="Last Name"
                />
              </label>
              <label htmlFor="username">
                <span>
                  <FaLock />
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
              <label htmlFor="confirm-password">
                <span>
                  <FaLock />
                </span>

                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="Confirm Password"
                />
              </label>

              <button type="submit">Signin</button>
            </IconContext.Provider>
          </form>
        </div>
      </section>
    </section>
  );
};

export default Signin;
