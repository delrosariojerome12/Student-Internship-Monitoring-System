import React from "react";
import {useDispatch} from "react-redux";
import {
  handleSelectedDocument,
  handleDocumentOpen,
} from "../../features/interns/documentsReducer";
import {FaEye, FaCheck} from "react-icons/fa";
import {GrDocumentMissing} from "react-icons/gr";
import {ImCross} from "react-icons/im";
import {RiMailSendFill} from "react-icons/ri";

const DocumentIntern = React.memo(({item}) => {
  const {
    document: {format, sample, name},
    completion: {isApproved, hasSent, isRejected, sentDocument},
  } = item;
  const dispatch = useDispatch();

  const renderDocument = () => {
    if (format === "pdf") {
      // return;
      return <p>View PDF</p>;
    } else {
      return <p>View Image</p>;
    }
  };

  const handleDocumentClick = () => {
    dispatch(handleSelectedDocument(item));
  };

  const renderDocumentStatus = () => {
    if (isApproved) {
      return <FaCheck />;
    } else if (isRejected) {
      return <ImCross />;
    } else if (hasSent) {
      return <RiMailSendFill />;
    } else {
      return <GrDocumentMissing />;
    }
  };

  return (
    <div className="document-intern" onClick={handleDocumentClick}>
      {renderDocumentStatus()}
      <FaEye onClick={() => dispatch(handleDocumentOpen())} />
      <p>{name}</p>
    </div>
  );
});

export default DocumentIntern;
