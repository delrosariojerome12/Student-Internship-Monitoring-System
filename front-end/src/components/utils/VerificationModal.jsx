import React, {useState} from "react";

const VerificationModal = React.memo(() => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = verificationCode.join("");
    console.log(`Verifying code: ${code}`);
  };

  return (
    <div className="verification-modal">
      <form onSubmit={handleSubmit}>
        <h1>Verification code:</h1>
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
        <button type="submit">Verify</button>
      </form>
    </div>
  );
});

export default VerificationModal;
