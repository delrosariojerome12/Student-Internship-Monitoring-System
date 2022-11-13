import React from "react";
import logo from "../../assets/img/logo.svg";
const Notification = () => {
  return (
    <div className="notification">
      <div className="notif-icon">
        <img src={logo} alt="" />
      </div>
      <div className="notif-details"></div>
    </div>
  );
};

export default Notification;
