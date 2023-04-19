/** @format */

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {verifyCode} from "../../features/user/userReducer";
const VerificationModal = React.memo(() => {
  const dispatch = useDispatch();
  const {visitorEmail, isVerifyLoading, isVerifyError, pendingUser} =
    useSelector((state) => state.user);
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {
    value = value.replace(/\D/g, "").slice(0, 1);

    setVerificationCode((prevVerificationCode) => {
      const newVerificationCode = [...prevVerificationCode];
      newVerificationCode[index] = value;
      return newVerificationCode;
    });

    if (value) {
      const nextIndex = index + 1;
      if (nextIndex < verificationCode.length) {
        document.getElementById(`verification-code-${nextIndex}`).focus();
      }
    }
  };

  console.log(pendingUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = verificationCode.join("");
    console.log(`Verifying code: ${code}`);
    dispatch(
      verifyCode({
        email: visitorEmail,
        code: verificationCode.join(""),
        pendingUser,
      })
    );
  };

  // useEffect

  return (
    <div className="verification-modal">
      <form onSubmit={handleSubmit}>
        <h1>
          The code has been sent to: <span>{visitorEmail}</span>
        </h1>
        <div className="text">
          <h2>Verification code:</h2>
          <p>Codes are valid for 24hrs</p>
        </div>
        <label>
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              id={`verification-code-${index}`}
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </label>
        <button
          style={
            verificationCode.filter((item) => item.length > 0).length !== 4
              ? {pointerEvents: "none", opacity: 0.5}
              : {
                  opacity: 1,
                }
          }
          disabled={
            verificationCode.filter((item) => item.length > 0).length !== 4
              ? true
              : false
          }
          type="submit"
        >
          {isVerifyLoading ? "Verifying..." : "Verify"}
        </button>
        {isVerifyError && <h2 className="invalidCode">Invalid Code!</h2>}
      </form>
    </div>
  );
});

export default VerificationModal;
