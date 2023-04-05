/** @format */

import React, {useEffect} from "react";
import Approval from "../../components/coordinator/ApprovalIntern";
import {useSelector, useDispatch} from "react-redux";
import ApprovalWaiting from "../../assets/img/waiting.svg";
import Bouncing from "../../components/loading/Bouncing";
import ServerError from "../serverError";
import {getAllInterns} from "../../features/interns/internReducer";
const Approvals = React.memo(() => {
  const {approvalInterns, isLoading, isError} = useSelector(
    (state) => state.intern
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInterns());
  }, []);

  const renderApprovals = () => {
    if (!approvalInterns) {
      return <h1>loading...</h1>;
    }

    if (approvalInterns.length === 0) {
      return (
        <section className="approvals">
          <div className="no-entries">
            <h4>
              Oops, there were no <b>entries</b> yet come back again later
            </h4>
            <div className="img-waiting">
              <img src={ApprovalWaiting} alt="Approvals waiting image" />
            </div>
          </div>
        </section>
      );
    }

    return approvalInterns.map((intern, index) => {
      return <Approval intern={intern} key={index} index={index} />;
    });
  };

  if (isLoading) {
    return <Bouncing />;
  }
  if (isError) {
    return <ServerError />;
  }

  console.log(approvalInterns);

  return (
    <section className="approvals">
      <header>
        <h2>Approvals</h2>
      </header>
      <div className="approval-container">
        <div className="approvals-intern-container">{renderApprovals()}</div>
      </div>
    </section>
  );
});

export default Approvals;
