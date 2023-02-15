import React, {useState} from "react";
import {FaRegEdit, FaRegCheckCircle} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {
  handleEdit,
  handleView,
  handleDelete,
} from "../../features/coordinator/internship";
const Internship = React.memo(({internship}) => {
  const {
    companyName,
    companyAddress,
    logo: {link},
    supervisor,
    supervisorContact,
    students,
    typeOfWork,
    description,
  } = internship;
  const dispatch = useDispatch();
  console.log(internship);
  return (
    <div className="internship">
      <div className="img-con">
        <img src={link} alt={companyName} />
      </div>
      <div className="controls">
        <p>{companyName}</p>
        <div className="internship-btn">
          <button
            onClick={() => {
              dispatch(handleView());
            }}
          >
            View
          </button>
          <button
            onClick={() => {
              dispatch(handleEdit());
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              dispatch(handleDelete());
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

export default Internship;
