import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {handleEditModal} from "../../../features/interns/narrativeReducer";
const EditModal = React.memo(() => {
  const {selectedDay} = useSelector((state) => state.narrative);
  const dispatch = useDispatch();
  return (
    <>
      <div className="overlay"></div>
      <div className="edit-modal modal">
        <h3>Edit</h3>

        <button onClick={() => dispatch(handleEditModal())}>Close</button>
      </div>
    </>
  );
});

export default EditModal;
