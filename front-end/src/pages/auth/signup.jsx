import React, {useState} from "react";
import {Link} from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import {FaUserAlt, FaLock, FaEye, FaEyeSlash, FaCheck} from "react-icons/fa";
import {GrMail} from "react-icons/gr";
import {IconContext} from "react-icons";
import {useDispatch, useSelector} from "react-redux";
import {handleSignup} from "../../features/user/userReducer";

import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../../Firebase";
import {v4} from "uuid";

const Signup = () => {
  const {isError, errorMessage} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [form, setForm] = useState([
    {
      forInput: "Profile Image",
      type: "file",
      id: "profile-image",
      value:
        "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png",
      IconType: FaUserAlt,
      isError: false,
      errorMessage: "Image should be less than",
      hasEyeIcon: false,
      code: "profileImage",
      isVisible: true,
    },
    {
      forInput: "First Name",
      type: "text",
      id: "first-name",
      value: "",
      IconType: FaUserAlt,
      isError: false,
      errorMessage: "First name must be between 3 and 20 characters long",
      hasEyeIcon: false,
      code: "firstName",
      isVisible: true,
    },
    {
      forInput: "Last Name",
      type: "text",
      id: "last-name",
      value: "",
      IconType: FaUserAlt,
      isError: false,
      errorMessage: "Last name must be between 3 and 20 characters long",
      hasEyeIcon: false,
      code: "lastName",
      isVisible: true,
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
      code: "email",
      isVisible: true,
    },
    {
      forInput: "Password",
      type: "password",
      id: "password",
      value: "",
      IconType: FaLock,
      isError: false,
      errorMessage:
        "Password must have: Atleast 1 uppercase, 1 lowercase, 1 number, 1 special characters and minimum of 8 characters",
      requirements: [],
      hasEyeIcon: true,
      code: "password",
      isVisible: true,
      hasShownPassword: false,
    },
    {
      forInput: "Confirm Password",
      type: "password",
      id: "confirm-password",
      value: "",
      IconType: FaLock,
      isError: false,
      errorMessage: "Password are not the same",
      hasEyeIcon: true,
      hasShownPassword: false,
      isVisible: false,
    },
  ]);

  const handleOnChange = (value, index, input) => {
    const data = [...form];
    data[index].value = value;
    switch (input) {
      case "First Name":
        let firstNameRegex = /(\b[a-z](?!\s))/g;
        value.length > 2 && value.length < 20
          ? (data[index].isError = false)
          : (data[index].isError = true);

        let firstNameValue = data[index].value.replace(firstNameRegex, (x) =>
          x.charAt(0).toUpperCase()
        );
        data[index].value = firstNameValue;

        setForm(data);
        return;
      case "Last Name":
        value.length > 2 && value.length < 20
          ? (data[index].isError = false)
          : (data[index].isError = true);
        data[index].value =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        setForm(data);
        return;
      case "Email":
        const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = emailRegex.test(value);
        isValid ? (data[index].isError = false) : (data[index].isError = true);
        setForm(data);
        return;
      case "Password":
        const passwordRegex =
          /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_.-]).*$/;
        let isPasswordValid = passwordRegex.test(value);
        if (isPasswordValid) {
          data[index].isError = false;
          data[index + 1].isVisible = true;
        } else {
          data[index].isError = true;
          data[index + 1].isVisible = false;
          data[index + 1].value = "";
        }
        setForm(data);
        return;
      case "Confirm Password":
        const password = form[index - 1].value;
        const confirmPassword = form[index];
        const confirmPasswordRegex =
          /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;
        let isConfirmPasswordValid = confirmPasswordRegex.test(value);
        password === confirmPassword.value && isConfirmPasswordValid
          ? (confirmPassword.isError = false)
          : (confirmPassword.isError = true);

        setForm(data);

        return;
      case "Profile Image":
        const imageRef = ref(
          storage,
          `images/users/profileImages/${v4() + value.name}`
        );
        uploadBytes(imageRef, value).then((res) => {
          getDownloadURL(res.ref).then((url) => {
            data[index].value = url;
            setForm(data);
          });
        });
        return;
      default:
        break;
    }
  };

  const handleShowPassword = (index) => {
    const newForm = [...form];
    newForm[index].hasShownPassword
      ? (newForm[index].hasShownPassword = false)
      : (newForm[index].hasShownPassword = true);

    newForm[index].type === "password"
      ? (newForm[index].type = "text")
      : (newForm[index].type = "password");
    setForm(newForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let x = 0;
    form.forEach((item) => {
      item.isError && x++;
    });
    // api send
    if (x === 0) {
      dispatch(handleSignup(form));
    }
  };

  const renderEyeIcon = (condition, index) => {
    return condition ? (
      <FaEye onClick={() => handleShowPassword(index)} />
    ) : (
      <FaEyeSlash onClick={() => handleShowPassword(index)} />
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
        hasShownPassword,
        isVisible,
        code,
      } = inputs;

      switch (type) {
        case "text":
        case "email":
        case "password":
          return (
            isVisible && (
              <div className="input-contain" key={index}>
                <input
                  type={type}
                  name={code}
                  id={code}
                  className={isError ? "input-error" : null}
                  value={value}
                  required
                  onChange={(e) =>
                    handleOnChange(e.target.value, index, forInput)
                  }
                  autoComplete={hasEyeIcon ? "true" : null}
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
                {hasEyeIcon && (
                  <div className="eye-container">
                    {renderEyeIcon(hasShownPassword, index)}
                  </div>
                )}
              </div>
            )
          );
        case "file":
          return (
            <div key={index} className="img-input">
              <label htmlFor={id}>
                <div className="profile-con">
                  <img src={value} alt="profile" />

                  {/* {value ? (
                    <img src={value} alt="profile image" />
                  ) : (
                    <img src={defaultImage} alt="profile image" />
                  )} */}
                </div>
                {value.includes("firebase") ? (
                  <p>
                    Profile Selected
                    <FaCheck />
                  </p>
                ) : (
                  <p>Select Profile Image</p>
                )}
                <input
                  type="file"
                  name={forInput}
                  id={id}
                  accept="image/*"
                  onChange={(e) =>
                    handleOnChange(e.target.files[0], index, forInput)
                  }
                />
              </label>
            </div>
          );
        default:
      }
    });
  };

  return (
    <section className="signin">
      <section className="bg-container"></section>
      <section className="card-container">
        <header>
          <img src={logo} alt="" />
          <h1>Create Your Account</h1>
          {isError && <h3 style={{color: "red"}}>{errorMessage}</h3>}
        </header>
        <form onSubmit={handleSubmit}>
          <IconContext.Provider value={{className: "icons"}}>
            {renderInputs()}
            <span>
              <p>Already have an account?</p>
              <Link to="/account/login">Log in</Link>
            </span>
            <button type="submit">Sign up</button>
          </IconContext.Provider>
        </form>
      </section>
    </section>
  );
};

export default Signup;
