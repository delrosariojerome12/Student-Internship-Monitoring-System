import React, {useState} from "react";
import {FaChevronDown} from "react-icons/fa";

const ReportContent = React.memo(() => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="narrative-content">
      <div className="weeks">
        <h5>Week</h5>
        <h5>1</h5>
      </div>
      <div className="weeks-count">
        <h5>Weekly Narrative Report</h5>
        <p>0/5</p>
      </div>
      <div className="dropdown">
        <FaChevronDown />
      </div>
    </div>
  );
});

export default ReportContent;
