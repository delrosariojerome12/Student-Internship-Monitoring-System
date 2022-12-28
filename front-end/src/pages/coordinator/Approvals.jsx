import React from "react";
import Approval from "../../components/coordinator/ApprovalIntern";
import {useSelector, useDispatch} from "react-redux";

import {GoSearch} from "react-icons/go";

const Approvals = () => {
  const {interns, isLoading, isError} = useSelector((state) => state.intern);

  const renderApprovals = () => {
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    return interns
      .filter((intern) => {
        const {
          verification: {hasSentVerification, isVerified},
        } = intern;
        if (hasSentVerification && isVerified === false) {
          return intern;
        }
      })
      .map((intern, index) => {
        return <Approval intern={intern} key={index} />;
      });
  };

  return (
    <section className="approvals">
      <header>Approvals</header>
      <div className="approvals-intern-container">{renderApprovals()}</div>
    </section>
  );
};

export default Approvals;
