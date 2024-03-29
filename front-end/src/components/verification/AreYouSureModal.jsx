import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const AreYouSureModal = React.memo(({ handleFinalizing, setSubmitted }) => {
  const finalizeSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <div className="are-you-sure-modal">
      <h3>You are about to submit these details, do you want to proceed?</h3>
      <span>
        <FaCheckCircle />
      </span>
      <p>Kindly wait for the approval of your account</p>
      <div className="button-container">
        <button onClick={() => handleFinalizing(false)}>Cancel</button>
        <button onClick={finalizeSubmit}>Submit</button>
      </div>
    </div>
  );
});

export default AreYouSureModal;
