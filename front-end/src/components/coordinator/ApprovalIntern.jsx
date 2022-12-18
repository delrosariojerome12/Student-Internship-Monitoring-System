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
        <div className="upper">
          <div className="internt-name">
            <p className="name">
              <b>
                {firstName} {lastName}
              </b>
            </p>
            <p className="program">
              <b>Program:</b> {schoolDetails?.program}
            </p>
          </div>

          <div className="intern-infos">
            <p className="program">
              <b>{internshipDetails?.companyName}</b>
            </p>
            <p>
              <b>Colegio De San Gabriel Arcangel</b>
            </p>
          </div>

          <div className="notification-bell">
            <span>
              <IoMdNotifications />
            </span>
          </div>
        </div>

        <div className="lower">
          <button>
            <span>
              <FaAngleDoubleDown />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default ApprovalIntern;
