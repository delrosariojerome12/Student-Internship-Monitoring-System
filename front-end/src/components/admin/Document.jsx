import React from "react";

const Document = React.memo(({doc: {name, description, type}}) => {
  return (
    <div className="document">
      <p>Name: {name}</p>
      <p>Description: {description}</p>
      <p>Type: {type}</p>
    </div>
  );
});

export default Document;
