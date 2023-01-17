import React, {useState} from "react";
import {FaTrash, FaEdit} from "react-icons/fa";
const Document = React.memo(({doc}) => {
  const {name, description, type} = doc;

  return (
    <div className="document" onClick={() => console.log("Test")}>
      <div className="icon-container">
        <FaTrash />
        <FaEdit />
      </div>
      <p>{name}</p>
      {/* <p>Description: {description}</p> */}
      {/* <p>Type: {type}</p> */}
    </div>
  );
});

export default Document;
