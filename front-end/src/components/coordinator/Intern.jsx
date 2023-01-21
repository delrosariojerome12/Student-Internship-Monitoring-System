import React from "react";

const Intern = React.memo(({ intern }) => {
  const {
    user: { firstName, lastName, profileImage },
    schoolDetails,
    verification: { isVerified, hasSentVerification },
  } = intern;

  // console.log(schoolDetails);

  return (
    <div className="intern">
      <div className="img-container">
        <img src={profileImage} alt="profile-image" />
      </div>
      <div className="intern-details">
        <p className="name">
          {firstName} {lastName}
        </p>
        <p className="program">{schoolDetails?.program}</p>
        <p className="is-verify">{isVerified ? "Verified" : "Not Verified"}</p>
        <div className="btnContainer">
          <button className="view">View</button>
          <button className="update">Update</button>
          <button className="delete">Delete</button>
        </div>
      </div>
    </div>
  );
});

export default Intern;
