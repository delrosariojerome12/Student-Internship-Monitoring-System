import React from "react";
import logo from "../../assets/img/logo.svg";
import img from "../../assets/img/secure-login.svg";
import {FaUserAlt, FaLock, FaEye, FaEyeSlash} from "react-icons/fa";
import {IconContext} from "react-icons";
import {useState} from "react";

const Signin = () => {
  const [form, setForm] = useState([
    {
      forInput: "First Name",
      type: "text",
      id: "first-name",
      value: "",
      IconType: FaUserAlt,
    },
    {
      forInput: "Last Name",
      type: "text",
      id: "last-name",
      value: "",
      IconType: FaUserAlt,
    },
    {
      forInput: "Email",
      type: "email",
      id: "email",
      value: "",
      IconType: FaUserAlt,
    },
    {
      forInput: "Password",
      type: "password",
      id: "password",
      value: "",
      IconType: FaLock,
    },
    {
      forInput: "Confirm Password",
      type: "password",
      id: "confirm-password",
      value: "",
      IconType: FaLock,
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleOnChange = (value, index) => {
    const data = [...form];
    data[index].value = value;
    setForm(data);
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
            <IconContext.Provider value={{color: "#000", className: "icons"}}>
              {form.map((inputs, index) => {
                const {forInput, id, type, value, IconType} = inputs;
                return (
                  <div className="input-contain" key={index}>
                    <input
                      type={type}
                      name={forInput}
                      id={id}
                      value={value}
                      onChange={(e) => handleOnChange(e.target.value, index)}
                    />
                    <label
                      htmlFor={id}
                      className={
                        value ? "placeholder-text active" : "placeholder-text"
                      }
                    >
                      <div className="text">
                        <span>
                          <IconType />
                        </span>
                        {forInput}
                      </div>
                    </label>
                  </div>
                );
              })}
              <button type="submit">Signin</button>
            </IconContext.Provider>
          </form>
        </div>
      </section>
    </section>
  );
};

export default Signin;
