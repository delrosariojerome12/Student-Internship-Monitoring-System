/** @format */

import React from "react";
import UnderCon from "../../assets/img/UnderDev.svg";

const AdminDashboard = React.memo(() => {
  return (
    <div className="under-dev">
      <div className="name-greet">
        <h1>
          Hello, <b>Placement Officer</b>
        </h1>
        <h4> Welcome Back!</h4>
      </div>
      <div className="con">
        <h1>This part is still in development.</h1>
        <img src={UnderCon} alt="under-dev" />
      </div>
    </div>
  );
});

export default AdminDashboard;
