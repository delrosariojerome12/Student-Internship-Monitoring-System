import React from "react";
import Intership from "../../components/coordinator/Internship";
import { useSelector } from "react-redux";

const Internships = React.memo(() => {
  const { approvalInterns } = useSelector((state) => state.intern);
  const renderInternship = () => {
    if (!approvalInterns) {
      return <h1>loading...</h1>;
    }

    return approvalInterns.map((intern, index) => {
      return <Intership intern={intern} key={index} index={index} />;
    });
  };

  return (
    <div className="internship-container">
      <div className="internship-content">{renderInternship()}</div>
    </div>
  );
});

export default Internships;
