import React from "react";
import { useSelector, useDispatch } from "react-redux";

const ApprovalIntern = () => {
  const {
    user: { firstName, lastName },
  } = useSelector((state) => state.user);

  return (
    <div className="approval-intern">
      <div className="img-container"></div>
      <div className="intern-details">
        <p className="name">
          {firstName} {lastName}
        </p>
      </div>
    </div>
  );
};

export default ApprovalIntern;
