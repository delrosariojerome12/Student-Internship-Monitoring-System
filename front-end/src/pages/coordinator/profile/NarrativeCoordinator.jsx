import React, { useEffect } from "react";
import { getAllNarrative } from "../../../features/interns/narrativeReducer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import ReportContent from "../../../components/intern/NarrativeContent";
import _ from "lodash";
import ServerError from "../../serverError";
import Bouncing from "../../../components/loading/Bouncing";
import ApprovalWaiting from "../../../assets/img/waiting.svg";

const NarrativeCoordinator = () => {
  const { allNarrative, isError } = useSelector((state) => state.narrative);
  const dispatch = useDispatch();
  const { email } = useParams();

  useEffect(() => {
    dispatch(getAllNarrative({ email }));
  }, []);

  const renderNarrative = () => {
    if (allNarrative.length === 0) {
      return (
        <div className="no-content">
          <h3>
            No <b>Reports</b> Available.
          </h3>
          <img src={ApprovalWaiting} alt="waiting" />
        </div>
      );
    }
    const groupNarrative = _.chunk(allNarrative, 5);
    return (
      <div className="report-container">
        {groupNarrative.map((item, index) => {
          return <ReportContent report={item} key={index} week={index} />;
        })}
      </div>
    );
  };

  if (!allNarrative) {
    return <Bouncing />;
  }

  if (isError) {
    return <ServerError />;
  }
  return <div className="narrative-container">{renderNarrative()}</div>;
};

export default NarrativeCoordinator;
