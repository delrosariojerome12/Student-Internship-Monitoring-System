import React from "react";
import {handleSelectedIntern} from "../../features/interns/internReducer";
import {useDispatch, useSelector} from "react-redux";

const Intern = React.memo(({intern}) => {
  const {
    user: {email, firstName, lastName, profileImage},
    internshipDetails: {
      companyAddress,
      companyName,
      renderedHours,
      supervisor,
      typeOfWork,
    },
    schoolDetails: {requiredHours, program, studentContact},
    scheduleDetails: {scheduleType, timeInSchedule, timeOutSchedule},
  } = intern;

  const dispatch = useDispatch();
  const {selectedIntern} = useSelector((state) => state.intern);

  return (
    <div
      className={
        selectedIntern && selectedIntern.email === email
          ? "active-intern intern"
          : "intern"
      }
      onClick={() => dispatch(handleSelectedIntern(intern))}
    >
      <div className="img-container">
        <img src={profileImage} alt="profile-image" />
      </div>
      <div className="intern-details">
        <p>{`${firstName} ${lastName}`}</p>
        <p>{`Total Hours: ${renderedHours}/${requiredHours}`}</p>

        <div className="btnContainer">
          <button type="button" onClick={() => console.log("Test")}>
            View Intern
          </button>
        </div>
      </div>
    </div>
  );
});

export default Intern;
