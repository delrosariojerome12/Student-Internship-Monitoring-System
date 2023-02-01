import React, {useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

const DocumentIntern = React.memo(({intern}) => {
  const {
    user: {firstName, lastName, email, profileImage},
    internshipDetails: {companyName},
  } = intern;
  const [isDropDown, setDropDown] = useState(false);
  console.log(intern);
  return (
    <div className="document-intern">
      <div className="img-container">
        <img src={profileImage} alt={`${lastName}.img`} />
      </div>
      <div className="text">
        <p>{`${firstName} ${lastName}`}</p>
        <p>Internship at: {companyName}</p>
        <div
          className={
            isDropDown ? "dropdown-container active" : "dropdown-container"
          }
          onClick={() => setDropDown(!isDropDown)}
        >
          {isDropDown ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
    </div>
  );
});

export default DocumentIntern;
