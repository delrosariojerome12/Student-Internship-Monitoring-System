import React from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import pendingImg from "../../assets/img/landingPage/landing-dashboard.svg";

const Pending = React.memo(() => {
  const {user} = useSelector((state) => state.user);
  const {
    user: {firstName},
  } = user;
  const navigate = useNavigate();

  return (
    <div className="pending">
      <div className="greetings">
        <h1 className="name">Welcome, {firstName}</h1>
      </div>
      <div className="pending-content">
        <>
          <h3>Looks like your account is not verified yet.</h3>
          <img src={pendingImg} alt="pending.img" />
          <p>
            Before you continue to access the other features, you must verify
            your credentials
          </p>
          <p>
            You must provide your information and other requirements. This will
            help the administrator to know your Identity.
          </p>
          <button onClick={() => navigate("/dashboard/verification")}>
            Verify Account
          </button>
        </>
      </div>
    </div>
  );
});

export default Pending;
