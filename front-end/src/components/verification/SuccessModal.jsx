import React from "react";
import {useNavigate} from "react-router";

const SuccessModal = React.memo(({handleSuccessModal}) => {
  const navigate = useNavigate();
  return (
    <div className="success-modal">
      <h3>You successfully provided your information!</h3>
      <p>Kindly wait for the approval of your account</p>
      <button
        onClick={() => {
          handleSuccessModal(false);
          navigate("/dashboard");
        }}
      >
        Dashboard
      </button>
    </div>
  );
});

export default SuccessModal;
