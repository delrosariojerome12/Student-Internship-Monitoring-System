import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import DocumentSVG from "../../assets/img/noDocument.svg";
import ViewDocument from "../../assets/img/documentNigga.svg";
import { useDispatch } from "react-redux";
import {
  handleOpenDocument,
  rejectDocumentRequest,
  approveDocumentRequest,
} from "../../features/admin/documentApproval";

const DocumentIntern = React.memo(({ intern }) => {
  const {
    user: { firstName, lastName, email, profileImage },
    internshipDetails: { companyName },
    documentDetails,
  } = intern;
  const dispatch = useDispatch();
  const [isDropDown, setDropDown] = useState(false);
  const { totalDocuments } = useSelector((state) => state.documentApproval);

  const filteredDocumentDetails = [...documentDetails].filter(
    (item) => item.completion.isApproved !== true && item.completion.hasSent
  );

  const approvedDocuments = [...documentDetails].filter(
    (item) => item.completion.isApproved === true
  );

  const renderDocuments = () => {
    if (isDropDown) {
      if (filteredDocumentDetails.length !== 0) {
        return filteredDocumentDetails.map((document, index) => {
          const {
            completion: { fileName },
            document: { name },
            _id,
          } = document;

          return (
            <div className="document" key={index}>
              <img
                src={ViewDocument}
                alt="view docs"
                onClick={() => dispatch(handleOpenDocument(document))}
              />
              <div
                className="left"
                onClick={() => dispatch(handleOpenDocument(document))}
              >
                <p>{name}</p>
                <p className="filename">{fileName}</p>
              </div>
              <div className="btn-container">
                <button
                  onClick={() => {
                    dispatch(
                      approveDocumentRequest({
                        email,
                        id: _id,
                        documentDetails,
                      })
                    );
                  }}
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    dispatch(
                      rejectDocumentRequest({email, id: _id, documentDetails})
                    )
                  }
                >
                  Reject
                </button>
              </div>
            </div>
          );
        });
      } else {
        return (
          <div className="no-document">
            <img src={DocumentSVG} alt="document-none" />
            <h4>No Document to Check.</h4>
          </div>
        );
      }
    }
  };

  const renderStyle = () => {
    if (isDropDown) {
      if (documentDetails.length > 0) {
        return "text active";
      } else {
        return "text active-1";
      }
    }
    return "text";
  };

  return (
    <div className="document-intern">
      <div className="img-container">
        <img src={profileImage} alt={`${lastName}.img`} />
      </div>
      <div className={renderStyle()}>
        <div className="top">
          <p>
            <b>{`${firstName} ${lastName}`}</b>
          </p>
          <p className="internship-at">
            <b>Internship at: </b>
            {companyName}
          </p>
          <p>
            <b>Approved: </b>
            {`${approvedDocuments.length}/${totalDocuments}`}
          </p>
        </div>
        <div className="bottom">
          <div className="dropdown-container">
            {renderDocuments()}
            <div className="drop-btn" onClick={() => setDropDown(!isDropDown)}>
              {isDropDown ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DocumentIntern;
