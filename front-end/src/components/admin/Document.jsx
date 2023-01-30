import React from "react";
import {FaTrash, FaEdit} from "react-icons/fa";
import {handleSelect} from "../../features/admin/document";
import {useDispatch} from "react-redux";

const Document = React.memo(
  ({
    doc,
    handleDeleteModal,
    handleEditModal,
    handleSelectedDocument,
    handleDocumentModal,
  }) => {
    const {name, description, type, _id} = doc;
    const dispatch = useDispatch();

    return (
      <div
        className="document"
        onClick={() => {
          // dispatch(handleSelect(_id));
          handleSelectedDocument(doc);
          handleDocumentModal();
        }}
      >
        <div className="icon-container">
          <FaTrash
            onClick={(e) => {
              // dispatch(handleSelect(_id));
              handleSelectedDocument(doc);
              handleDeleteModal(e);
            }}
          />
          <FaEdit
            onClick={(e) => {
              // dispatch(handleSelect(_id));
              handleSelectedDocument(doc);
              handleEditModal(e, doc);
            }}
          />
        </div>
        <p>{name}</p>
      </div>
    );
  }
);

export default Document;
