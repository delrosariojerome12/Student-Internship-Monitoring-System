import React from "react";
import Intership from "../../components/coordinator/Internship";
import { useSelector } from "react-redux";

const Internships = React.memo(() => {
  const { approvalInterns } = useSelector((state) => state.intern);
  const renderApprovals = () => {
    if (!approvalInterns) {
      return <h1>loading...</h1>;
    }

    if (approvalInterns.length === 0) {
      return <h1>No approval request at the moment</h1>;
    }

    return approvalInterns.map((intern, index) => {
      return <Intership intern={intern} key={index} index={index} />;
    });
  };

  return (
    <div className="internship-container">
      <div className="internship-content">{renderApprovals()}</div>
    </div>
  );
});

export default Internships;
