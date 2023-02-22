import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {handleEdit} from "../../features/coordinator/internship";

const EditModal = React.memo(({renderInputs, form}) => {
  const {selectedInternship} = useSelector((state) => state.internship);
  const dispatch = useDispatch();

  const convertForm = () => {
    const entries = Object.entries(selectedInternship[0]).map((item) => {
      const x = Object.assign({}, item);
      return {[x[0]]: x[1], code: x[0], value: x[1]};
    });

    const final = entries
      .map((i) => {
        const newForm = form.map(
          (item) => item.code === i.code && {...item, value: i.value}
        );
        return newForm.filter((c) => c).sort((item) => item.type)[0];
      })
      .filter((x) => x);

    return final;
  };

  return (
    <>
      <div onClick={() => dispatch(handleEdit())} className="overlay"></div>
      <div className="edit-modal modal">
        <form>
          {renderInputs(convertForm())}
          <div className="btn-holder">
            <button type="button" onClick={() => dispatch(handleEdit())}>
              Close
            </button>
            <button
              //   style={
              //     isComplete
              //       ? {opacity: "1"}
              //       : {opacity: ".7", pointerEvents: "none"}
              //   }
              type="button"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
});

export default EditModal;
