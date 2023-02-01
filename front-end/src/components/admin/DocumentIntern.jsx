import React, {useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {useSelector} from "react-redux";

import {Viewer} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const DocumentIntern = React.memo(({intern}) => {
  const {
    user: {firstName, lastName, email, profileImage},
    internshipDetails: {companyName},
    documentDetails,
  } = intern;
  const [isDropDown, setDropDown] = useState(false);
  const {totalDocuments} = useSelector((state) => state.documentApproval);

  console.log(documentDetails);

  const renderDocuments = () => {
    if (isDropDown) {
      if (documentDetails.length > 0) {
        return documentDetails.map((document, index) => {
          const {
            completion: {fileName},
            document: {name},
          } = document;
          return (
            <div className="document" key={index}>
              <div className="left">
                <p>{name}</p>
                <p>{fileName}</p>
              </div>
              <div className="btn-container">
                <button>Approve</button>
                <button>Reject</button>
              </div>
            </div>
          );
        });
      } else {
        return <h1>No Document to Check.</h1>;
      }
    }
  };
  return (
    <div className="document-intern">
      <div className="img-container">
        <img src={profileImage} alt={`${lastName}.img`} />
      </div>
      <div className={isDropDown ? "text active" : "text"}>
        <div className="top">
          <p>{`${firstName} ${lastName}`}</p>
          <p>Internship at: {companyName}</p>
          <p>Documents: {`${documentDetails.length}/${totalDocuments}`}</p>
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
