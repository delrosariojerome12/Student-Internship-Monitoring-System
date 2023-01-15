import React from "react";

const DashboardIntern = React.memo(({ intern }) => {
  const {
    user: { firstName, lastName, profileImage },
    schoolDetails,
    verification: { isVerified, hasSentVerification },
  } = intern;

  return (
    <section className="all-interns">
      <div className="img-intern">
        <img src={profileImage} alt="profile-image" />
      </div>
      <div className="intern-detail">
        <p className="full-name">
          {firstName} {lastName}
        </p>
        <p className="program">{schoolDetails?.program}</p>
        <p className="is-verify">{isVerified ? "Verified" : "Not Verified"}</p>
      </div>
    </section>
  );
});

export default DashboardIntern;
