import React from "react";
import {useSelector, useDispatch} from "react-redux";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const InternshipDetail = React.memo(() => {
  const {
    user: {
      internshipDetails: {
        companyAddress,
        companyName,
        description,
        email,
        logo: {link, name},
        startingDate,
        supervisor,
        supervisorContact,
        typeOfWork,
      },
    },
  } = useSelector((state) => state.user);

  const formatDate = (date) => {
    const dateArr = date.split("-");
    return `${months[dateArr[1] - 1]} ${dateArr[2]} ${dateArr[0]}`;
  };

  return (
    <div className="internship-details-container">
      <div className="img-con">
        <img src={link} alt={name} />
      </div>
      <div className="text">
        <h4>Type of Work: {typeOfWork}</h4>
        <h4>Started working since: {formatDate(startingDate)}</h4>
        <h4>Company name: {companyName}</h4>
        <h4>Address: {companyAddress}</h4>
        <h4>Email: {email}</h4>
        <h4>Supervisor: {supervisor}</h4>
        <h4>Supervisor Contact: {supervisorContact}</h4>
        <h4>Description: {description}</h4>
      </div>
    </div>
  );
});

export default InternshipDetail;
