import React from "react";
import approvalImg from "../../assets/img/approvalWaiting.svg";
const ApprovalWating = () => {
  return (
    <section className="approval-waiting">
      <h4>Oops, there were no entries yet come back again later</h4>
      <img src={approvalImg} alt="Approvals waiting image" />
    </section>
  );
};

export default ApprovalWating;
