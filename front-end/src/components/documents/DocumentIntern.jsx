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
import DarkSent from "../../assets/img/sentDocumentDark.svg";
import LightSent from "../../assets/img/sentDocumentLight.svg";

const DocumentIntern = React.memo(({item, handleSentDocument}) => {
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

  const handleDocumentClick = (e) => {
    e.stopPropagation();
    handleSentDocument();
    dispatch(handleSelectedDocument(item));
  };

  const renderDocumentStatus = () => {
    if (isApproved) {
      return <FaCheck />;
    } else if (isRejected) {
      return <ImCross />;
    } else if (hasSent) {
      return <RiMailSendFill />;
      // return <img src={DarkSent} alt="sent" />;
    } else {
      return <GrDocumentMissing />;
    }
  };

  return (
    <div className="document-intern" onClick={(e) => handleDocumentClick(e)}>
      {renderDocumentStatus()}
      <FaEye onClick={() => dispatch(handleDocumentOpen())} />
      <p>{name}</p>
    </div>
  );
});

export default DocumentIntern;
