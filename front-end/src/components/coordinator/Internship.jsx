/** @format */

import React, {useState} from "react";
import {FaRegEdit, FaRegCheckCircle} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {
  handleEdit,
  handleView,
  handleDelete,
  deleteInternship,
  handleMessage,
} from "../../features/coordinator/internship";

const Internship = React.memo(({internship, editForm}) => {
  const {
    companyName,
    companyAddress,
    logo: {link},
    supervisor,
    supervisorContact,
    students,
    typeOfWork,
    description,
    _id,
  } = internship;
  const {
    user: {user},
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <div className="internship">
      <div className="img-con">
        <img src={link} alt={companyName} />
      </div>
      <div className="controls">
        <h4>{companyName}</h4>

        {user.role === "intern" ? (
          <div className="internship-btn">
            <button
              onClick={() => {
                dispatch(handleView({id: _id}));
              }}
            >
              View
            </button>
          </div>
        ) : (
          <div className="internship-btn">
            <button
              onClick={() => {
                dispatch(handleView({id: _id}));
              }}
            >
              View
            </button>
            <button
              onClick={() => {
                dispatch(handleEdit({id: _id}));
                editForm(internship);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                dispatch(deleteInternship({id: _id}));
                const timer = setTimeout(() => dispatch(handleMessage()), 3000);
                return () => clearTimeout(timer);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default Internship;
