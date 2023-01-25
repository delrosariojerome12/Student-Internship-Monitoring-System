import React, {useEffect} from "react";
import {AiOutlineFileAdd} from "react-icons/ai";
import {FaRegCommentDots} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import DocumentIntern from "../../components/documents/DocumentIntern";
import {
  updateDocumentsOnLoad,
  handleDocumentOpen,
  handleSampleViewed,
} from "../../features/interns/documentsReducer";
import ServerError from "../serverError";
import Bouncing from "../../components/loading/Bouncing";
import {IconContext} from "react-icons";

import DocumentDark from "../../assets/img/documentNigga.svg";
import {Viewer} from "@react-pdf-viewer/core";

const Documents = () => {
  const {user} = useSelector((state) => state.user);
  const {isLoading, isError, selectedDocument, isDocumentOpen, isSampleViewed} =
    useSelector((state) => state.internDocument);
  const dispatch = useDispatch();

  const {documentDetails} = user;

  useEffect(() => {
    dispatch(updateDocumentsOnLoad(user.email));
  }, []);

  if (isLoading) {
    return <Bouncing />;
  }

  if (isError) {
    return <ServerError />;
  }

  const renderDocumentDetails = () => {
    if (selectedDocument.format === "pdf") {
      if (isSampleViewed) {
        return <Viewer fileUrl={selectedDocument.sample} />;
      }
      return (
        <div className="preview-container">
          <img src={DocumentDark} alt="document click" />
          <p>Click to View</p>
        </div>
      );
    } else if (selectedDocument.format === "image") {
      return <img src={selectedDocument.sample} alt="profile" />;
    } else if (selectedDocument.format === "docx") {
      return <p>Click to View</p>;
    }
  };

  return (
    <section className="documents-page">
      <IconContext.Provider value={{className: "icon"}}>
        <div className="top">
          <div className="selected-document-indicator">
            {selectedDocument ? (
              <>
                <h4>Selected Document:</h4>
                <p>{selectedDocument.name}</p>
              </>
            ) : (
              <>
                <p>No Document Selected.</p>
              </>
            )}
          </div>
          <div className="drop-file">
            <div className="drop-file-container">
              <div className="add-icon">
                <span>
                  <AiOutlineFileAdd />
                </span>
              </div>
              <div className="add-file-text">
                <h5>Drag and drop files, or Browse</h5>
                <p>Support zip or rar files</p>
              </div>
            </div>
          </div>
        </div>
        <div className="display">
          {documentDetails.map((item, index) => {
            return <DocumentIntern key={index} item={item} />;
          })}
        </div>
        {isDocumentOpen && (
          <>
            <div
              className="overlay"
              onClick={() => dispatch(handleDocumentOpen())}
            ></div>
            <div className="required-document">
              <div className="content">
                <div className="document-name">
                  <h4>Document</h4>
                  <p>{selectedDocument.name}</p>
                </div>
                <div
                  className="img-container"
                  onClick={() => dispatch(handleSampleViewed())}
                >
                  {renderDocumentDetails()}
                </div>
                <div className="desc-container">
                  <p>Description: {selectedDocument.description}</p>
                  <p>Format: {selectedDocument.format}</p>
                </div>
              </div>
              <div className="btn-container">
                <button onClick={() => dispatch(handleDocumentOpen())}>
                  Close
                </button>
              </div>
            </div>
          </>
        )}
        {isSampleViewed && (
          <>
            <div
              className="overlay"
              onClick={() => dispatch(handleSampleViewed())}
            ></div>
            <div className="sample-view-container">
              {renderDocumentDetails()}
            </div>
          </>
        )}
      </IconContext.Provider>
    </section>
  );
};

export default Documents;
