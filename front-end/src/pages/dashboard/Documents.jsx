import React, {useEffect, useState} from "react";
import {AiOutlineFileAdd} from "react-icons/ai";
import {useSelector, useDispatch} from "react-redux";
import DocumentIntern from "../../components/documents/DocumentIntern";
import {
  updateDocumentsOnLoad,
  handleDocumentOpen,
  handleSampleViewed,
  sendDocument,
  removeDocument,
  handleDocumentDetails,
} from "../../features/interns/documentsReducer";
import ServerError from "../serverError";
import Bouncing from "../../components/loading/Bouncing";
import {IconContext} from "react-icons";
import {ImCross} from "react-icons/im";
import DocumentDark from "../../assets/img/documentNigga.svg";
import ErrorInput from "../../assets/img/errorInput.svg";
import {Viewer} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import {storage} from "../../Firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";

const Documents = React.memo(() => {
  const {user} = useSelector((state) => state.user);
  const {
    isLoading,
    isError,
    selectedDocument,
    isDocumentOpen,
    isSampleViewed,
    documentDetails,
  } = useSelector((state) => state.internDocument);
  const dispatch = useDispatch();

  const [sentDocument, setSentDocument] = useState(null);
  const [isSentDocumentOpen, setSentDocumentOpen] = useState(false);
  const [isInputError, setInputError] = useState(false);
  const [status, setStatus] = useState("");
  const [isStatusOpen, setStatusOpen] = useState(false);

  useEffect(() => {
    // change this to update or make a button for
    user.documentDetails.length === 0 &&
      dispatch(updateDocumentsOnLoad(user.email));
    dispatch(handleDocumentDetails(user.documentDetails));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(documentDetails);
  console.log(selectedDocument);
  // console.log(user.documentDetails);

  if (isLoading) {
    return <Bouncing />;
  }

  if (isError) {
    return <ServerError />;
  }

  if (!documentDetails) {
    return <Bouncing />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      sendDocument({
        sentDocument: sentDocument.sample,
        id: selectedDocument._id,
        filePath: sentDocument.filePath,
        fileName: sentDocument.name,
      })
    );
    setStatus("add");
    setStatusOpen(true);
    const timer = setTimeout(() => setStatusOpen(false), 3000);
    return () => clearTimeout(timer);
  };

  const handleImageInput = (file) => {
    if (file) {
      const imageName = `images/documents/sample/${v4() + file.name}`;
      const {type} = file;
      const imageRef = ref(storage, imageName);
      // add delete
      if (type.includes(selectedDocument.document.format)) {
        uploadBytes(imageRef, file)
          .then((res) => {
            getDownloadURL(res.ref)
              .then((url) => {
                setSentDocument({
                  sample: url,
                  name: file.name,
                  format: type,
                  filePath: imageName,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setInputError(true);
      }
    }
  };

  const handleSentDocument = () => {
    setSentDocument(null);
  };

  const renderClickable = () => {
    if (selectedDocument && !sentDocument) {
      if (selectedDocument.completion.sentDocument) {
        return true;
      }
      if (isInputError) {
        return true;
      }
      return false;
    } else if (selectedDocument && sentDocument) {
      return true;
    } else {
      return true;
    }
  };
  const checkFormat = () => {
    if (selectedDocument.document.format === "pdf") {
      return "application/pdf";
    }
    return "image/*";
  };

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
    }
  };

  const renderViewDocument = () => {
    if (sentDocument) {
      if (sentDocument.format.includes("pdf")) {
        return <Viewer fileUrl={sentDocument.sample} />;
      }
    } else if (selectedDocument) {
      if (selectedDocument.document.format.includes("pdf")) {
        return <Viewer fileUrl={selectedDocument.completion.sentDocument} />;
      }
      return (
        <img
          src={selectedDocument.completion.sentDocument}
          alt={selectedDocument.completion.fileName}
        />
      );
    }
    return <img src={sentDocument.sample} alt={sentDocument.name} />;
  };

  const handleDeleteDocument = (e) => {
    e.stopPropagation();
    setSentDocument(null);
    if (selectedDocument.completion.sentDocument) {
      dispatch(removeDocument({id: selectedDocument._id}));
      setStatus("remove");
      setStatusOpen(true);
      const timer = setTimeout(() => setStatusOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  };

  const renderSentDocument = () => {
    if (sentDocument && selectedDocument) {
      return (
        <>
          <div className="overlay-document"></div>
          <div className="document-preview">
            <div className="details">
              <div
                className="left"
                onClick={() => setSentDocumentOpen(!isSentDocumentOpen)}
              >
                <img src={DocumentDark} alt="document" />
                <p>{sentDocument.name}</p>
              </div>
              <button type="button" onClick={handleDeleteDocument}>
                <ImCross />
              </button>
            </div>
            <button className="submit">Submit</button>
          </div>
        </>
      );
    } else if (selectedDocument) {
      if (selectedDocument.completion.sentDocument) {
        return (
          <>
            <div className="overlay-document"></div>
            <div className="document-preview">
              <div className="details">
                <div
                  className="left"
                  onClick={() => setSentDocumentOpen(!isSentDocumentOpen)}
                >
                  <img src={DocumentDark} alt="document" />
                  <p>{selectedDocument.completion.fileName}</p>
                </div>
                <button type="button" onClick={handleDeleteDocument}>
                  <ImCross />
                </button>
              </div>
              <button
                type="button"
                className="submit"
                onClick={handleDeleteDocument}
              >
                Unsubmit
              </button>
            </div>
          </>
        );
      }
    }
  };

  const renderStatus = () => {
    if (status === "add") {
      return "Document Submitted";
    }
    if (status === "remove") {
      return "Document Removed.";
    }
  };

  const renderAdminResponse = () => {
    if (selectedDocument.completion.isRejected) {
      return <p>Document Rejected.</p>;
    }
    if (selectedDocument.completion.isApproved) {
      return <p>Document Approved.</p>;
    }
    if (selectedDocument.completion.hasSent) {
      return <p>Document Submitted.</p>;
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
                {renderSentDocument()}
                <div className="file-con" onClick={(e) => e.stopPropagation()}>
                  {selectedDocument ? (
                    <div className="drop-file-container">
                      <div className="add-icon">
                        <span>
                          <AiOutlineFileAdd />
                        </span>
                      </div>
                      <div className="add-file-text">
                        <h5>Select File to Submit</h5>
                      </div>
                    </div>
                  ) : (
                    <div className="drop-file-container">
                      <div className="overlay-document"></div>
                      <div className="add-icon">
                        <span>
                          <AiOutlineFileAdd />
                        </span>
                      </div>
                      <div className="add-file-text">
                        <h5>Select File to Submit</h5>
                      </div>
                    </div>
                  )}
                  {isInputError && (
                    <>
                      <div className="overlay"></div>
                      <div className="error-container">
                        <h4>Invalid file format</h4>
                        <img src={ErrorInput} alt="error input" />
                        <button
                          type="button"
                          onClick={() => setInputError(false)}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {selectedDocument && (
                  <input
                    disabled={renderClickable()}
                    onChange={(e) => handleImageInput(e.target.files[0])}
                    id="document"
                    type="file"
                    onSubmit={handleSubmit}
                    accept={checkFormat()}
                  />
                )}
              </label>
            </form>
          </div>
        </div>
        <div className="display">
          <div className={isStatusOpen ? "status active" : "status"}>
            <p>{renderStatus()}</p>
          </div>
          {documentDetails.map((item, index) => {
            return (
              <DocumentIntern
                key={index}
                item={item}
                handleSentDocument={handleSentDocument}
              />
            );
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
        {isSentDocumentOpen && (
          <>
            <div
              className="overlay"
              onClick={() => {
                setSentDocumentOpen(!isSentDocumentOpen);
              }}
            ></div>
            <div className="sample-view-container">
              {renderAdminResponse()}
              {renderViewDocument()}
            </div>
          </>
        )}
      </IconContext.Provider>
    </section>
  );
});

export default Documents;
