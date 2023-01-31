import React from "react";
import {useSelector, useDispatch} from "react-redux";
const DocumentApproval = () => {
  const {isLoading, isError, interns, selectedIntern} = useSelector(
    (state) => state.documentApproval
  );
  console.log(isLoading);
  return <div>DocumentApproval</div>;
};

export default DocumentApproval;
