import React from "react";
import Internship from "../../components/coordinator/Internship";

const Internships = React.memo(() => {
  return (
    <div className="internship-container">
      <div className="internship-content">
        <Internship />
      </div>
    </div>
  );
});

export default Internships;
