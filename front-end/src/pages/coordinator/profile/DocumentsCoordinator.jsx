import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import Waiting from "../../../assets/img/no-internship.svg";

const DocumentsCoordinator = React.memo(() => {
  const {
    selectedIntern: {documentDetails},
    isError,
    isLoading,
  } = useSelector((state) => state.intern);

  const renderDocumentRecords = () => {
    if (documentDetails.length === 0) {
      return (
        <div className="no-request">
          <h3>
            No <b>Documents</b> Found.
          </h3>
          <img src={Waiting} alt="waiting" />
        </div>
      );
    }

    return documentDetails.map((item, index) => {
      const {completion, document} = item;
      return (
        <div className="document-record" key={index}>
          <h4>{document.name}</h4>
          <h4
            style={{
              color: completion.isApproved
                ? "#00adb5"
                : completion.hasSent
                ? "#323232"
                : completion.isRejected
                ? "#e63946"
                : "#F18805",
            }}
          >
            {completion.isApproved
              ? "Approved"
              : completion.hasSent
              ? "Sent"
              : completion.isRejected
              ? "Rejected"
              : "Missing"}
          </h4>
        </div>
      );
    });
  };

  return <div className="request-container">{renderDocumentRecords()}</div>;
});

export default DocumentsCoordinator;
