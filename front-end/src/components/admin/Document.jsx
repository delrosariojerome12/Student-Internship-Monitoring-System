import React from "react";
import {FaTrash, FaEdit} from "react-icons/fa";
import {handleSelect} from "../../features/admin/document";
import {useDispatch} from "react-redux";

const Document = React.memo(({doc, handleDeleteModal, handleEditModal}) => {
  const {name, description, type, _id} = doc;
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    handleDeleteModal();
  };
  const handleEditClick = () => {
    handleEditModal();
  };
  console.log("test");
  return (
    <div className="document" onClick={() => dispatch(handleSelect(_id))}>
      <div className="icon-container">
        <FaTrash onClick={handleDeleteClick} />
        <FaEdit onClick={handleEditClick} />
      </div>
      <p>{name}</p>
      {/* <p>Description: {description}</p> */}
      {/* <p>Type: {type}</p> */}
    </div>
  );
});

export default Document;
