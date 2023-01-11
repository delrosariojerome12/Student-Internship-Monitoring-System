import React from "react";
import Intership from "../../components/coordinator/Internship";

const Internships = React.memo(() => {
  return (
    <div className="internship-container">
      <div className="internship-content">{Intership()}</div>
    </div>
  );
});

export default Internships;
