import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {handleTimeIn} from "../../features/interns/attendanceReducer";
import axios from "axios";
import Geocode from "react-geocode";

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

// google
// const key = "AIzaSyCTjmfiw3OrY9VEd45-xnYkeBslrqIuR8o";
// ip stack
// const key = "8068a32023cc9f982fdbd53adb3ddbfd";

const key = "UjTu7V2EcFJBTyd0zjudhuFrRNP4iWXJ";

const TimeInModal = () => {
  const dispatch = useDispatch();

  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");

  const getLocation = async (latitude, longitude) => {
    try {
      const url = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${key}`;
      const response = await axios.get(url);
      console.log(response);
      setAddress(response.data.addresses[0].address.freeformAddress);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      // whole date
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      // hour
      const hours = date.getHours() % 12 || 12; // get hours in 12-hour format
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const amOrPm = date.getHours() >= 12 ? "PM" : "AM"; // set AM or PM

      const fullHour = `${hours}:${minutes}:${seconds} ${amOrPm}`;
      const fullDate = `${month}, ${day} ${year}`;

      setTime(`${fullDate} ${fullHour}`);
    }, 1000);

    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords;
      getLocation(latitude, longitude);
    });
    return () => clearInterval(interval);
  }, []);

  if (!time || !address) {
    return (
      <>
        <div className="overlay" onClick={() => dispatch(handleTimeIn())}></div>
        <div className="time-in modal">
          <h3>Fetching Time and Location...</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="overlay" onClick={() => dispatch(handleTimeIn())}></div>
      <div className="time-in modal">
        <h2>{time}</h2>
        <h3>{address}</h3>
      </div>
    </>
  );
};

export default TimeInModal;
