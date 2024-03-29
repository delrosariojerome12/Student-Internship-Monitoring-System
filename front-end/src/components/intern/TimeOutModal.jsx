/** @format */

import React, {useState, useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  handleTimeOut,
  timeOutAttendance,
} from "../../features/interns/attendanceReducer";
import axios from "axios";
import CameraSVG from "../../assets/img/camera.svg";
import NocameraSVG from "../../assets/img/nocamera.svg";
import Webcam from "react-webcam";
import {storage} from "../../Firebase";
import {ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";
import {v4} from "uuid";

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
const convertImage = (str) => {
  var pos = str.indexOf(";base64,");
  var type = str.substring(5, pos);
  var b64 = str.substr(pos + 8);

  var imageContent = window.atob(b64);

  var buffer = new ArrayBuffer(imageContent.length);
  var view = new Uint8Array(buffer);

  for (var n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }
  var blob = new Blob([buffer], {type: type});

  return blob;
};

const key = "UjTu7V2EcFJBTyd0zjudhuFrRNP4iWXJ";

const TimeOutModal = React.memo(({email}) => {
  const {
    todayAttendance,
    timeObject: {dateTime},
    isTimeOutLoading,
  } = useSelector((state) => state.attendance);

  const {
    proof: {timeInLink, timeOutLink},
  } = todayAttendance;
  const dispatch = useDispatch();

  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [hasCamera, setHasCamera] = useState(true);
  const [facingMode, setFacingMode] = useState("user");
  const [deviceType, setDeviceType] = useState(null);

  const cameraRef = useRef(null);

  const handleUserMediaError = (error) => {
    setHasCamera(false);
    console.log("Error accessing user media:", error);
  };

  const cameraConstraints = {
    width: 400,
    height: 400,
    facingMode: facingMode,
  };
  const handleToggleCamera = () => {
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };
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

      const completeAddress = `${freeformAddress} ${countrySecondarySubdivision} ${country} `;
      const coordinates = `NE: ${northEast} SW: ${southWest}`;
      setAddress(`${completeAddress} ${coordinates}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCaptureImage = () => {
    const imageUrl = convertImage(cameraRef.current.getScreenshot());

    const imageName = `images/attendance/timeIn/${v4()}`;
    const imageRef = ref(storage, imageName);

    uploadBytes(imageRef, imageUrl)
      .then((res) => {
        getDownloadURL(res.ref)
          .then((url) => {
            setCapturedPhoto(url);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date(dateTime);

      const hours =
        date.getHours() % 12 || 12 < 10
          ? `0${date.getHours() % 12 || 12}`
          : date.getHours() % 12 || 12;
      const minutes =
        10 > date.getMinutes() ? `0${date.getMinutes()}` : date.getMinutes();
      const seconds =
        date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
      const amOrPm = date.getHours() >= 12 ? "PM" : "AM"; // set AM or PM

      const fullHour = `${hours}:${minutes}:${seconds} ${amOrPm}`;

      setTime(fullHour);
    }, 1000);

    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 900) {
        setDeviceType("desktop");
      } else if (width > 768) {
        setDeviceType("tablet");
      } else {
        setDeviceType("phone");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords;

      getLocation(latitude, longitude);
    });
    return () => clearInterval(interval);
  }, []);

  if (!time || !address) {
    return (
      <>
        <div
          className="overlay"
          onClick={() => dispatch(handleTimeOut())}
        ></div>
        <div className="time-out modal">
          <h3>Fetching Time and Location...</h3>
        </div>
      </>
    );
  }

  if (!hasCamera) {
    return (
      <>
        <div
          className="overlay"
          onClick={() => dispatch(handleTimeOut())}
        ></div>
        <div className="no-camera modal">
          <div className="top">
            <img src={NocameraSVG} alt="No-Camera" />
            <h3>
              No <b>Camera</b> Detected
            </h3>
          </div>
          <div className="bottom">
            <button onClick={() => dispatch(handleTimeOut())}>Close</button>
          </div>
        </div>
      </>
    );
  }

  const renderToggle = () => {
    if (deviceType === "tablet" || deviceType === "phone") {
      return <button onClick={handleToggleCamera}>Toggle Camera</button>;
    }
  };

  return (
    <>
      <div className="overlay" onClick={() => dispatch(handleTimeOut())}></div>
      <div className="time-out modal">
        <div className="address">
          <h2>{time}</h2>
          <h3>{address}</h3>
          <p>
            Take a picture of your time record or yourself at your Internship.
          </p>
        </div>
        <div className="camera">
          {capturedPhoto ? (
            <img src={capturedPhoto} alt="camera" />
          ) : (
            <>
              <Webcam
                ref={cameraRef}
                mirrored={true}
                videoConstraints={cameraConstraints}
                screenshotFormat="image/jpeg"
                onUserMediaError={handleUserMediaError}
              />
              <button onClick={handleCaptureImage}>Take Photo</button>
              {renderToggle()}
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() =>
            dispatch(
              timeOutAttendance({
                email,
                form: {
                  isPresent: true,
                  locationTimeOut: address,
                  proof: {
                    timeOutLink: capturedPhoto,
                    timeInLink,
                  },
                  timeOut: time,
                  isComplete: true,
                },
              })
            )
          }
          style={
            isTimeOutLoading || !capturedPhoto
              ? {opacity: ".7", pointerEvents: "none"}
              : {opacity: 1}
          }
        >
          {isTimeOutLoading ? "Timing out..." : "Time out"}
        </button>
      </div>
    </>
  );
});

export default TimeOutModal;
