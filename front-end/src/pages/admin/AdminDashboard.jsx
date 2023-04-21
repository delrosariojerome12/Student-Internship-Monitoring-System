import React from "react";
import UnderCon from "../../assets/img/UnderDev.svg";

const AdminDashboard = React.memo(() => {
  return (
    <div className="under-dev">
      <div className="con">
        <h1>This part is still in development.</h1>
        <img src={UnderCon} alt="under-dev" />
      </div>
    </div>
  );
});

export default AdminDashboard;
