import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  handleEdit,
  handleMessage,
  updateInternship,
} from "../../features/coordinator/internship";

const EditModal = React.memo(
  ({renderInputs, form, clearValue, isComplete, convertForm}) => {
    const {selectedInternship} = useSelector((state) => state.internship);
    const dispatch = useDispatch();

    return (
      <>
        <div
          onClick={() => {
            dispatch(handleEdit());
            clearValue();
          }}
          className="overlay"
        ></div>
        <div className="edit-modal modal">
          <form>
            {renderInputs(form)}
            <div className="btn-holder">
              <button
                type="button"
                onClick={() => {
                  dispatch(handleEdit());
                  clearValue();
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  dispatch(
                    updateInternship({
                      form: convertForm(form),
                      id: selectedInternship[0]._id,
                    })
                  );
                  const timer = setTimeout(
                    () => dispatch(handleMessage()),
                    3000
                  );
                  return () => clearTimeout(timer);
                }}
                style={
                  isComplete
                    ? {opacity: "1"}
                    : {opacity: ".7", pointerEvents: "none"}
                }
                type="button"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
);

export default EditModal;
