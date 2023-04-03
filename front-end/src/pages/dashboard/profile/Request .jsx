/** @format */

import React from "react";
import {useSelector, useDispatch} from "react-redux";

const Request = React.memo(() => {
  const {
    user: {documentDetails},
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const renderDocumentRecords = () => {
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
                ? "#5DB7DE"
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

export default Request;
