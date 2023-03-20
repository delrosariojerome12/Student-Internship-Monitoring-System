import React, {useEffect, useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import NarrativeDay from "./NarrativeDay";
import {IconContext} from "react-icons/lib";
import {useSelector, useDispatch} from "react-redux";
import {handleSelect} from "../../features/interns/narrativeReducer";

const NarrativeContent = React.memo(({report, week}) => {
  const {selected} = useSelector((state) => state.narrative);
  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false);

  const renderDays = () => {
    return report.map((item, index) => {
      return <NarrativeDay key={index} details={item} day={index} />;
    });
  };

  const getAllComplete = () => {
    return report.filter((item) => {
      const {
        narrative: {isComplete},
      } = item;
      return isComplete && item;
    });
  };

  const totalCompleted = getAllComplete();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setOpen(false);
    });
  }, []);

  return (
    <IconContext.Provider value={{className: "icon"}}>
      <div className="narrative-content">
        <div className="sub-container">
          <div className="weeks">
            <h5>Week</h5>
            <h5>{week === 0 ? 1 : week + 1}</h5>
          </div>
          <div className="weeks-count">
            <h5>Weekly Narrative Report</h5>
            <p>{totalCompleted.length}/5</p>
          </div>
        </div>
        <div
          className={
            isOpen && week === selected
              ? "active dropdown-container"
              : "dropdown-container"
          }
        >
          <div className="days-container">{isOpen && renderDays()}</div>
          <div
            className="dropdown-btn"
            onClick={() => {
              setOpen(!isOpen);
              dispatch(handleSelect(week));
            }}
          >
            {isOpen && week === selected ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
});

export default NarrativeContent;
