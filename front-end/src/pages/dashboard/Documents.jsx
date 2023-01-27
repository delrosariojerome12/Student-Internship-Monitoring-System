import React, {useEffect, useState} from "react";
import {AiOutlineFileAdd} from "react-icons/ai";
import {useSelector, useDispatch} from "react-redux";
import DocumentIntern from "../../components/documents/DocumentIntern";
import {
  updateDocumentsOnLoad,
  handleDocumentOpen,
  handleSampleViewed,
  sendDocument,
} from "../../features/interns/documentsReducer";
import ServerError from "../serverError";
import Bouncing from "../../components/loading/Bouncing";
import {IconContext} from "react-icons";
import {ImCross} from "react-icons/im";
import DocumentDark from "../../assets/img/documentNigga.svg";
import {Viewer} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import {storage} from "../../Firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";

const Documents = () => {
  const {user} = useSelector((state) => state.user);
  const {isLoading, isError, selectedDocument, isDocumentOpen, isSampleViewed} =
    useSelector((state) => state.internDocument);
  const dispatch = useDispatch();

  const [sentDocument, setSentDocument] = useState(null);
  const [sendConfirmation, setSendConfirmation] = useState(false);
  const [isSentDocumentOpen, setSentDocumentOpen] = useState(false);

  const {documentDetails} = user;

  useEffect(() => {
    // change this to update or make a button for it
    user.documentDetails.length === 0 &&
      dispatch(updateDocumentsOnLoad(user.email));
  }, []);

  if (isLoading) {
    return <Bouncing />;
  }

  if (isError) {
    return <ServerError />;
  }

  console.log(user.documentDetails);
  console.log(sentDocument);

  const renderDocumentDetails = () => {
    if (selectedDocument.document.format === "pdf") {
      if (isSampleViewed) {
        return <Viewer fileUrl={selectedDocument.document.sample} />;
      }
      return (
        <div className="preview-container">
          <img src={DocumentDark} alt="document click" />
          <p>Click to View</p>
        </div>
      );
    } else if (selectedDocument.document.format === "image") {
      return <img src={selectedDocument.document.sample} alt="profile" />;
    } else if (selectedDocument.document.format === "docx") {
      return <p>Click to View</p>;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(sendDocument(user.documentDetails));
    console.log("submitted");
  };

  const handleImageInput = (file) => {
    const imageName = `images/documents/sample/${v4() + file.name}`;
    const imageRef = ref(storage, imageName);
    // add delete
    uploadBytes(imageRef, file).then((res) => {
      getDownloadURL(res.ref).then((url) => {
        setSentDocument({url, fileName: file.name});
        setSendConfirmation(true);
      });
    });
  };

  const renderClickable = () => {
    if (selectedDocument && !sentDocument) {
      return false;
    } else if (selectedDocument && sendDocument) {
      return true;
    } else {
      return true;
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
                <div className="sub-con">
                  <p>{selectedDocument.document.name}</p>
                </div>
              </>
            ) : (
              <>
                <h4>Selected Document:</h4>
                <div className="sub-con">
                  <p>No Document Selected.</p>
                </div>
              </>
            )}
          </div>
          <div className="drop-file">
            <form onSubmit={handleSubmit}>
              <label htmlFor="document">
                {sentDocument && (
                  <>
                    <div className="overlay-document"></div>
                    <div className="document-preview">
                      <div className="details">
                        <div className="left">
                          <img src={DocumentDark} alt="document" />
                          <p>{sentDocument.fileName}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => console.log("remove")}
                        >
                          <ImCross />
                        </button>
                      </div>
                      <button className="submit">Submit</button>
                    </div>
                  </>
                )}
                {/* {sendConfirmation && (
                  <>
                    <div className="overlay-confirmation"></div>
                    <div className="send-confirmation">
                      <button
                        onClick={() => {
                          setSendConfirmation(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button type="submit">Send</button>
                    </div>
                  </>
                )} */}
                <div className="file-con">
                  {selectedDocument ? (
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
                  ) : (
                    <div className="drop-file-container">
                      <div className="overlay"></div>
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
                  )}
                </div>
                <input
                  disabled={renderClickable()}
                  onChange={(e) => handleImageInput(e.target.files[0])}
                  id="document"
                  type="file"
                  onSubmit={handleSubmit}
                />
              </label>
            </form>
          </div>
          {/* <div className="drop-file">
        
          </div> */}
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
                  <p>{selectedDocument.document.name}</p>
                </div>
                <div
                  className="img-container"
                  onClick={() => dispatch(handleSampleViewed())}
                >
                  {renderDocumentDetails()}
                </div>
                <div className="desc-container">
                  <p>Description: {selectedDocument.document.description}</p>
                  <p>Format: {selectedDocument.document.format}</p>
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
