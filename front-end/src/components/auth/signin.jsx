import React from "react";
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
      IconType: GrMail,
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
      IconType: FaCheckCircle,
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
