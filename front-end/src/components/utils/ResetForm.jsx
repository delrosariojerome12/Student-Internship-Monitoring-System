/** @format */

import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../features/user/userReducer";
const ResetForm = React.memo(({ email }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState([
    {
      forInput: "Password",
      type: "password",
      id: "reset-password",
      value: "",
      IconType: FaLock,
      isError: false,
      errorMessage:
        "Password must have: Atleast 1 uppercase, 1 lowercase, 1 number minimum of 8 characters",
      requirements: [],
      hasEyeIcon: true,
      code: "password",
      isVisible: true,
      hasShownPassword: false,
    },
    {
      forInput: "Confirm Password",
      type: "password",
      id: "reset-confirm-password",
      value: "",
      IconType: FaLock,
      isError: false,
      errorMessage: "Password are not the same",
      hasEyeIcon: true,
      hasShownPassword: false,
      isVisible: false,
    },
  ]);

  const [isComplete, setComplete] = useState(false);

  const checkCompletion = () => {
    let numOfErrors = 0;
    let numOfValues = 0;

    form.forEach((item) => {
      item.isError && numOfErrors++;
      item.value && numOfValues++;
    });

    const lengthForms = form.length;

    if (numOfErrors === 0 && numOfValues - 1 === lengthForms - 1) {
      setComplete(true);
    } else {
      setComplete(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleOnChange = (value, index, input) => {
    const data = [...form];
    switch (input) {
      case "Password":
        data[index].value = value;

        const passwordRegex =
          /^(?=.*\d)(?=.*[@#$%^&+=_.-`!~])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

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
        checkCompletion();

        return;
      case "Confirm Password":
        data[index].value = value;

        const password = data[index - 1].value;
        const confirmPassword = data[index];

        const confirmPasswordRegex =
          /^(?=.*\d)(?=.*[@#$%^&+=_.-`!~])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        let isConfirmPasswordValid = confirmPasswordRegex.test(value);
        password === value && isConfirmPasswordValid
          ? (confirmPassword.isError = false)
          : (confirmPassword.isError = true);

        setForm(data);
        checkCompletion();

        return;
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
  const handleSubmit = (e) => {
    e.preventDefault();
    isComplete && console.log("Submit");
    isComplete && dispatch(resetPassword({ email, password: form[0].value }));
  };

  const renderEyeIcon = (condition, index) => {
    return condition ? (
      <FaEye onClick={() => handleShowPassword(index)} />
    ) : (
      <FaEyeSlash onClick={() => handleShowPassword(index)} />
    );
  };
  const renderInputs = () => {
    return form.map((item, index) => {
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
      } = item;
      return (
        isVisible && (
          <div className="input-contain" key={index}>
            <input
              type={type}
              name={code}
              id={id}
              className={isError ? "input-error" : null}
              value={value}
              required
              onChange={(e) => handleOnChange(e.target.value, index, forInput)}
              autoComplete={hasEyeIcon ? "true" : null}
            />
            <div className="placeholder-container">
              <label
                htmlFor={id}
                className={
                  value ? "placeholder-text active" : "placeholder-text"
                }>
                <div className={isError ? "text icons-error" : "text"}>
                  <span>
                    <IconType className={isError ? "icons-error" : "icons"} />
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
    });
  };
  return (
    <>
      <div className="overlay"></div>
      <div className="reset-form">
        <h1>Create New Password</h1>
        <div className="reset-form-container">
          <form onSubmit={handleSubmit}>
            {renderInputs()}
            <div className="btn-submit">
              {isComplete && <button>Submit</button>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
});

export default ResetForm;
