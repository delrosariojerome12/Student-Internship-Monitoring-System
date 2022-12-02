import React from "react";

const Intern = React.memo(({intern}) => {
  const {
    user: {firstName, lastName},
    schoolDetails,
  } = intern;
  console.log(intern);
  return (
    <div className="intern">
      <div className="img-container"></div>
      <div className="intern-details">
        <p>
          {firstName} {lastName}
        </p>
        <p>{schoolDetails?.program}</p>
      </div>
    </div>
  );
});

export default Intern;
