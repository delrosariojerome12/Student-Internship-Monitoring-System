import React from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";

const ApprovalIntern = React.memo(({ intern }) => {
  const {
    user: { firstName, lastName },
    schoolDetails,
    internshipDetails,
    verification: { isVerified, hasSentVerification },
  } = intern;

  return (
    <div className="approval-intern">
      <div className="img"></div>
      <div className="details">
        <div className="internt-name">
          <p className="name">
            {firstName} {lastName}
          </p>
          <p className="program">Program: {schoolDetails?.program}</p>
        </div>
        <div className="intern-infos">
          <p className="program"> {internshipDetails?.companyName}</p>
          {/* <p className="program"> {schoolDetails?.program}</p> */}
        </div>
        <div className="intern-infos">
          <span>
            <IoMdNotifications />
          </span>
        </div>
        {/* <button>
          <span>
            <FaAngleDoubleDown />
          </span>
        </button> */}
      </div>
    </div>
  );
});

export default ApprovalIntern;
