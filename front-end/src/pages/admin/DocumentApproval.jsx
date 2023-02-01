import React from "react";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getAllVerifiedInterns} from "../../features/admin/documentApproval";
import Bouncing from "../../components/loading/Bouncing";
import ServerError from "../serverError";
import DocumentIntern from "../../components/admin/DocumentIntern";
const DocumentApproval = () => {
  const {isLoading, isError, interns, selectedIntern} = useSelector(
    (state) => state.documentApproval
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVerifiedInterns());
  }, []);

  if (isLoading) {
    return <Bouncing />;
  }
  if (isError) {
    return <ServerError />;
  }

  if (!interns) {
    return <Bouncing />;
  }

  return (
    <div className="document-approval-container">
      {interns.map((item, index) => (
        <DocumentIntern key={index} intern={item} />
      ))}
    </div>
  );
};

export default DocumentApproval;
