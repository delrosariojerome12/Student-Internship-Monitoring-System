import React from "react";
import {FaTrash, FaEdit} from "react-icons/fa";
import {handleSelect} from "../../features/admin/document";
import {useDispatch} from "react-redux";

const Document = React.memo(
  ({doc, handleDeleteModal, handleEditModal, handleDocumentModal}) => {
    const {name, description, type, _id} = doc;
    const dispatch = useDispatch();

    return (
      <div
        className="document"
        onClick={() => {
          dispatch(handleSelect(_id));
          handleDocumentModal();
        }}
      >
        <div className="icon-container">
          <FaTrash onClick={handleDeleteModal} />
          <FaEdit onClick={handleEditModal} />
        </div>
        <p>{name}</p>
        {/* <p>Description: {description}</p> */}
        {/* <p>Type: {type}</p> */}
      </div>
    );
  }
);

export default Document;
