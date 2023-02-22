import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {handleView} from "../../features/coordinator/internship";

const ViewModal = React.memo(({form}) => {
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
      <div onClick={() => dispatch(handleView())} className="overlay"></div>
      <div className="view-modal modal">
        {convertForm().map((item, index) => {
          const {forInput, value, id} = item;
          if (id === "logo") {
            const {
              value: {link, name},
            } = item;
            return (
              <div key={index} className="input img-con">
                <img src={link} alt="logo" />
              </div>
            );
          }
          return (
            <div key={index} className="input text-con">
              <h4>{forInput}</h4>
              <p>{value}</p>
            </div>
          );
        })}
      </div>
    </>
  );
});

export default ViewModal;
