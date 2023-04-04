/** @format */

import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  getAllAttendanceToday,
  getAllAttendanceByDate,
  handleFilter,
  handleSort,
  checkAbsents,
  handleSelectIntern,
  handleCloseModal,
} from "../../features/coordinator/monitorAttendance";
import Bouncing from "../../components/loading/Bouncing";
import ServerError from "../serverError";
import Attendance from "../../components/coordinator/Attendance";
import ViewMoreDetailsModal from "../../components/coordinator/ViewMoreDetailsModal";
import ViewNarrative from "../../components/coordinator/ViewNarrative";
import ApprovalWaiting from "../../assets/img/waiting.svg";

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();

const today = `${month < 10 ? "0" : ""}${month}-${
  date < 10 ? "0" : ""
}${date}-${year}`;

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

const MonitorAttendance = React.memo(() => {
  const {
    isLoading,
    isError,
    attendanceToday,
    isFilterOpen,
    isSortOpen,
    isFiltering,
    filteredValues,
    selectedIntern,
    isViewMoreDetailsOpen,
    isNarrativeOpen,
  } = useSelector((state) => state.monitorAttendance);
  const dispatch = useDispatch();

  const [time, setTime] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterIntern, setFilterIntern] = useState({
    internshipDetails: {
      companyName: "",
    },
  });

  useEffect(() => {
    // const now = new Date();
    // const hours = now.getHours();
    // if (hours >= 14) {
    //   dispatch(checkAbsents({}));
    // }
    dispatch(getAllAttendanceToday({}));
  }, []);

  if (isLoading || !attendanceToday) {
    return <Bouncing />;
  }
  if (isError) {
    return <ServerError />;
  }

  const renderAttendance = () => {
    if (attendanceToday.length === 0) {
      return (
        <div className="no-record">
          <h2>No Records Available.</h2>
          <div className="img-waiting">
            <img src={ApprovalWaiting} alt="Approvals waiting image" />
          </div>
        </div>
      );
    }
    return attendanceToday.map((item, index) => {
      return <Attendance key={index} attendance={item} />;
    });
  };

  const formatDate = (date) => {
    const dateArr = date.split("-");

    const currentMonth = parseInt(dateArr[0].slice(-1)) - 1;

    const currentFormat = ` ${months[currentMonth]} ${dateArr[1]}, ${dateArr[2]}`;
    return currentFormat;
  };

  return (
    <div className="monitor-attendance">
      <header>
        <div className="top">
          <h2>Attendance</h2>
        </div>
        <div className="mid">
          <div className="btn-container">
            <button onClick={() => dispatch(handleFilter())}>Filter</button>
            <button onClick={() => dispatch(handleSort())}>Sort</button>
          </div>
          <div className="date-container">
            <h3>{formatDate(today)}</h3>
            <h3>{time} </h3>
          </div>
        </div>
      </header>
      <div className="display">
        {isFiltering && <h1>Results for: {filteredValues.join(", ")} </h1>}
        <div className="content">{renderAttendance()}</div>
      </div>

      {isFilterOpen && (
        <>
          <div
            className="overlay"
            onClick={() => dispatch(handleFilter())}
          ></div>
          <div onClick={(e) => e.stopPropagation()} className="filter modal">
            <p>Filter</p>
            <div className="inputs-container">
              <label htmlFor="date">
                Date
                <input
                  value={filterDate}
                  type="date"
                  id="date"
                  onChange={(e) => {
                    setFilterDate(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="btn-controllers">
              <button
                style={
                  !filterDate ? {pointerEvents: "none", opacity: ".7"} : null
                }
                onClick={() =>
                  dispatch(
                    getAllAttendanceByDate({
                      date: filterDate,
                    })
                  )
                }
              >
                Filter
              </button>

              <button onClick={() => dispatch(handleFilter())}>Close</button>
            </div>
          </div>
        </>
      )}
      {isSortOpen && (
        <>
          <div className="overlay" onClick={() => dispatch(handleSort())}></div>
          <div onClick={(e) => e.stopPropagation()} className="sort modal">
            <div className="sort-div">
              <p>Sort</p>
            </div>
            <div className="close-btn">
              <button onClick={() => dispatch(handleSort())}>Close</button>
            </div>
          </div>
        </>
      )}
      {isViewMoreDetailsOpen && <ViewMoreDetailsModal />}
      {isNarrativeOpen && <ViewNarrative />}
    </div>
  );
});

export default MonitorAttendance;
