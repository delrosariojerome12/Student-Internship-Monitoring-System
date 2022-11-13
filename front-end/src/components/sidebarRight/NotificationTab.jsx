import React from "react";
import Notification from "./Notification";

const NotificationTab = () => {
  return (
    <div className="notification-tab tab">
      <h1>Notifications</h1>
      <div className="display">
        <Notification />
        <Notification />
      </div>
    </div>
  );
};

export default NotificationTab;
