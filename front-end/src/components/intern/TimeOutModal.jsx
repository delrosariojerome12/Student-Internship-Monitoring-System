import React, {useState, useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  handleTimeOut,
  timeOutAttendance,
} from "../../features/interns/attendanceReducer";
import axios from "axios";
import CameraSVG from "../../assets/img/camera.svg";
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
  const {todayAttendanceID, selectedAttendance} = useSelector(
    (state) => state.attendance
  );
  const {
    proof: {timeInLink, timeOutLink},
  } = selectedAttendance;
  const dispatch = useDispatch();

  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);

  const cameraConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
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
      const date = new Date();
      // whole date
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      // hour
      const hours = date.getHours() % 12 || 12;
      const minutes =
        10 > date.getMinutes() ? `0${date.getMinutes()}` : date.getMinutes();
      const seconds = date.getSeconds();
      const amOrPm = date.getHours() >= 12 ? "PM" : "AM"; // set AM or PM

      const fullHour = `${hours}:${minutes}:${seconds} ${amOrPm}`;
      // const fullDate = `${month} ${day}, ${year}`;

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
  return (
    <>
      <div className="overlay" onClick={() => dispatch(handleTimeOut())}></div>
      <div className="time-out modal">
        <div className="address">
          <h2>{time}</h2>
          <h3>{address}</h3>
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
              />
              <button onClick={handleCaptureImage}>Take Photo</button>
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
                  location: address,
                  proof: {
                    timeOutLink: capturedPhoto,
                    timeInLink,
                  },
                  timeOut: time,
                  isComplete: true,
                },
                id: todayAttendanceID,
              })
            )
          }
          style={
            capturedPhoto
              ? {opacity: "1"}
              : {opacity: ".7", pointerEvents: "none"}
          }
        >
          Time Out
        </button>
      </div>
    </>
  );
});

export default TimeOutModal;
