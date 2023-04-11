/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllVerifiedInterns,
  handleCloseDocument,
} from "../../features/admin/documentApproval";
import Bouncing from "../../components/loading/Bouncing";
import ServerError from "../serverError";
import DocumentIntern from "../../components/admin/DocumentIntern";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const DocumentApproval = () => {
  const { isLoading, isError, interns, selectedDocument, isDocumentOpen } =
    useSelector((state) => state.documentApproval);

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

  const renderDocumentDetails = () => {
    if (selectedDocument.document.format === "pdf") {
      return <Viewer fileUrl={selectedDocument.completion.sentDocument} />;
    } else if (selectedDocument.format === "image") {
      return (
        <img src={selectedDocument.completion.sentDocument} alt="profile" />
      );
    }
  };

  return (
    <div className="document-approval-container">
      {interns.length === 0 ? (
        <div className="no-approval">No Request At the moment.</div>
      ) : (
        interns.map((item, index) => (
          <DocumentIntern key={index} intern={item} />
        ))
      )}
      {isDocumentOpen && (
        <>
          <div
            className="overlay"
            onClick={() => dispatch(handleCloseDocument())}></div>
          <div className="view-document-container">
            {renderDocumentDetails()}
            <div className="btn-close">
              <button onClick={() => dispatch(handleCloseDocument())}>
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentApproval;
