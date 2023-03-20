import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {handleViewModal} from "../../../features/interns/narrativeReducer";

const ViewModal = React.memo(() => {
  const {selectedDay} = useSelector((state) => state.narrative);
  const dispatch = useDispatch();
  return (
    <>
      <div className="overlay"></div>
      <div className="view-modal modal">
        <h3>View</h3>
        <button onClick={() => dispatch(handleViewModal())}>Close</button>
      </div>
    </>
  );
});

export default ViewModal;
