import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getAllAttendance} from "../../features/interns/attendanceReducer";
import axios from "axios";

const Attendance = () => {
  // const {allAttendanceToday} = useSelector
  const [todayAttendance, setTodayAttendance] = useState(null);

  const fetchData = async () => {
    try {
      const url = `http://localhost:5000/attendance/getAllAttendanceToday`;
      const {data: res} = await axios.get(url);
      setTodayAttendance(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);

  if (!todayAttendance) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {todayAttendance.map((item, index) => {
        return <p key={index}>{item.email}</p>;
      })}
    </div>
  );
};

export default Attendance;
