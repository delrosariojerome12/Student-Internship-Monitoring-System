import React, {useState} from "react";
import {FaRegEdit, FaRegCheckCircle} from "react-icons/fa";

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
  console.log(internship);
  return (
    <div className="internship">
      <div className="img-con">
        <img src={link} alt={companyName} />
      </div>
      <p>{companyName}</p>
    </div>
  );
});

export default Internship;
