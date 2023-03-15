import React from "react";
import {useSelector, useDispatch} from "react-redux";

const Request = React.memo(() => {
  const {
    user: {documentDetails},
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(documentDetails);

  const renderDocumentRecords = () => {
    return documentDetails.map((item, index) => {
      const {completion, document} = item;
      return (
        <div className="document-record" key={index}>
          <h4>{document.name}</h4>
          <h4>{completion.isApproved ? "Done" : "Missing"}</h4>
        </div>
      );
    });
  };

  return <div className="request-container">{renderDocumentRecords()}</div>;
});

export default Request;
