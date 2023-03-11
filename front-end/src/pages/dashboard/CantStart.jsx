import React from "react";
import CantStartImg from "../../assets/img/notStarting.svg";
import {useNavigate} from "react-router";

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
const CantStart = React.memo(({startingDate}) => {
  const navigate = useNavigate();

  const date = startingDate.split("-")[2];
  const year = startingDate.split("-")[0];
  const month = months[startingDate.split("-")[1].slice(1) - 1];

  return (
    <div className="cant-start">
      <div className="cant-start-modal">
        <h3>Oh no, your schedule hasn’t started yet.</h3>
        <h3>Your internship will start on {`${month} ${date} ${year}`}</h3>
        <img src={CantStartImg} alt="not-starting" />
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      </div>
    </div>
  );
});

export default CantStart;
