import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  getAllAttendanceToday,
  getAllAttendanceByDate,
  handleFilter,
  handleSort,
} from "../../features/coordinator/monitorAttendance";
import Bouncing from "../../components/loading/Bouncing";
import ServerError from "../serverError";
import Attendance from "../../components/coordinator/Attendance";

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();

const today = `${month < 10 ? "0" : ""}${month}-${
  date < 10 ? "0" : ""
}${date}-${year}`;

const MonitorAttendance = () => {
  const {
    isLoading,
    isError,
    attendanceToday,
    isFilterOpen,
    isSortOpen,
    isFiltering,
    filteredValues,
  } = useSelector((state) => state.monitorAttendance);
  const dispatch = useDispatch();

  const [filterDate, setFilterDate] = useState("");
  const [filterIntern, setFilterIntern] = useState({
    internshipDetails: {
      companyName: "",
    },
  });

  useEffect(() => {
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
        <div>
          <h2>No Records Available.</h2>
        </div>
      );
    }
    return attendanceToday.map((item, index) => {
      return <Attendance key={index} attendance={item} />;
    });
  };

  const formatDate = (date) => {
    const dateArr = date.split("-");
    return `${dateArr[1]}-${dateArr[2]}-${dateArr[0]}`;
  };

  return (
    <div className="monitor-attendance">
      <div className="top">
        <h2>Attendance</h2>
      </div>
      <div className="mid">
        <div className="btn-container">
          <button onClick={() => dispatch(handleFilter())}>Filter</button>
          <button onClick={() => dispatch(handleSort())}>Sort</button>
        </div>
      </div>
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

            <button
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
        </>
      )}
      {isSortOpen && (
        <>
          <div className="overlay" onClick={() => dispatch(handleSort())}></div>
          <div onClick={(e) => e.stopPropagation()} className="sort modal">
            <p>Sort</p>
            <button onClick={() => dispatch(handleSort())}>Close</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MonitorAttendance;
