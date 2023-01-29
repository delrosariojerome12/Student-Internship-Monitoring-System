import React from "react";
import Internship from "../../components/coordinator/Internship";

const Internships = React.memo(() => {
  return (
    <div className="internship-container">
      <Internship />
    </div>
  );
});

export default Internships;
