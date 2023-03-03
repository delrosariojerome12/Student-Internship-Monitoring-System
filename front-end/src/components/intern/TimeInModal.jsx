import React, {useState, useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  handleTimeIn,
  timeInAttendance,
} from "../../features/interns/attendanceReducer";
import axios from "axios";
import CameraSVG from "../../assets/img/camera.svg";
import Webcam from "react-webcam";

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

const key = "UjTu7V2EcFJBTyd0zjudhuFrRNP4iWXJ";

let form = {
  isPresent: true,
  location: null,
  proof: {
    name: "hatdog na nakareverse",
    link: "linkingpark",
  },
  timeIn: "",
};

const TimeInModal = React.memo(({email}) => {
  const dispatch = useDispatch();

  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [capturedPhoto, setCapturePhoto] = useState(null);
  const cameraRef = useRef(null);

  const getLocation = async (latitude, longitude) => {
    try {
      const url = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${key}`;
      const response = await axios.get(url);
      const {
        freeformAddress,
        country,
        boundingBox: {northEast, southWest},
        countrySecondarySubdivision,
      } = response.data.addresses[0].address;
      // console.log(response.data.addresses[0].address);

      const completeAddress = `${freeformAddress} ${countrySecondarySubdivision} ${country} `;
      const coordinates = `NE: ${northEast} SW: ${southWest}`;
      setAddress(`${completeAddress} ${coordinates}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCaptureImage = () => {
    console.log(cameraRef.current.getScreenshot());
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
      const minutes =
        10 > date.getMinutes() ? `0${date.getMinutes()}` : date.getMinutes();
      const seconds = date.getSeconds();
      const amOrPm = date.getHours() >= 12 ? "PM" : "AM"; // set AM or PM

      const fullHour = `${hours}:${minutes}:${seconds} ${amOrPm}`;
      const fullDate = `${month} ${day}, ${year}`;

      setTime(fullHour);
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

  const cameraConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <>
      <div className="overlay" onClick={() => dispatch(handleTimeIn())}></div>
      <div className="time-in modal">
        <div className="address">
          <h2>{time}</h2>
          <h3>{address}</h3>
        </div>
        <div className="camera">
          <img src={CameraSVG} alt="camera" />
          <Webcam
            ref={cameraRef}
            mirrored={true}
            videoConstraints={cameraConstraints}
            screenshotFormat="image/jpeg"
          />
          <button onClick={handleCaptureImage}>Take Photo</button>
        </div>
        <button
          type="button"
          onClick={() =>
            dispatch(
              timeInAttendance({
                email,
                form: {
                  isPresent: true,
                  location: address,
                  proof: {
                    name: "hatdog na nakareverse",
                    link: "linkingpark",
                  },
                  timeIn: time,
                },
              })
            )
          }
          // style={
          //   capturedPhoto
          //     ? {opacity: "1"}
          //     : {opacity: ".7", pointerEvents: "none"}
          // }
        >
          Time in
        </button>
      </div>
    </>
  );
});

export default TimeInModal;
