import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getAllNarrative} from "../../../features/interns/narrativeReducer";
import ReportContent from "../../../components/intern/NarrativeContent";
import _ from "lodash";
import ServerError from "../../serverError";
import Bouncing from "../../../components/loading/Bouncing";
import ApprovalWaiting from "../../../assets/img/waiting.svg";

const Narrative = React.memo(() => {
  const {
    user: {email},
  } = useSelector((state) => state.user);
  const {allNarrative, isError} = useSelector((state) => state.narrative);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allNarrative) {
      dispatch(getAllNarrative({email}));
    }
  }, []);

  const renderNarrative = () => {
    if (allNarrative.length === 0) {
      return (
        <div className="no-content">
          <h3>No Reports found.</h3>
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
});

export default Narrative;
