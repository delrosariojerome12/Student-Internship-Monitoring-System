/** @format */

import React from "react";
import { useSelector, useDispatch } from "react-redux";

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
        logo: { link, name },
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
        <p>
          <b>Type of Work: </b> {typeOfWork}
        </p>
        <p>
          <b> Started working since: </b> {formatDate(startingDate)}
        </p>
        <p>
          <b>Company name: </b> {companyName}
        </p>
        <p>
          <b>Address: </b> {companyAddress}
        </p>
        <p>
          <b>Email: </b>
          {email}
        </p>
        <p>
          <b>Supervisor: </b>
          {supervisor}
        </p>
        <p>
          <b>Supervisor Contact: </b> {supervisorContact}
        </p>
        <p>
          <b>Description: </b> {description}
        </p>
      </div>
    </div>
  );
});

export default InternshipDetail;
