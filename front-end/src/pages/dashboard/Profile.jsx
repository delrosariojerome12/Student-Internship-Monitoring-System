import React, {useState, useEffect} from "react";
import {Route, Routes, Link, Navigate, useNavigate} from "react-router-dom";
import InternsDetail from "./profile/InternsDetail";
import InternshipDetail from "./profile/InternshipDetail";
import AttendanceViewer from "./profile/AttendanceViewer";
import Narrative from "./profile/Narrative";
import Request from "./profile/Request ";
import {useSelector} from "react-redux";

const buttons = [
  {
    path: "/dashboard/profile/internsDetail",
    btnName: "Interns Detail",
    code: "internsDetail",
  },
  {
    path: "/dashboard/profile/internshipDetail",
    btnName: "Internship Detail",
    code: "internshipDetail",
  },
  {
    path: "/dashboard/profile/attendance",
    btnName: "Attendance",
    code: "attendance",
  },
  {
    path: "/dashboard/profile/narrative",
    btnName: "Narrative",
    code: "narrative",
  },
  {
    path: "/dashboard/profile/request",
    btnName: "Request",
    code: "request",
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Interns Detail");

  const {
    user: {
      user: {firstName, lastName, profileImage},
      schoolDetails,
      internshipDetails,
    },
  } = useSelector((state) => state.user);

  useEffect(() => {
    const path = window.location.pathname.split("/");

    setSelected(path[3]);
  }, []);

  return (
    <section className="profile-page">
      <div className="profile-user">
        <div
          className="profile-bg"
          style={{
            background:
              "url(https://cdn.discordapp.com/attachments/1073177186758041610/1083331391414087690/289776510_551525149810290_8984060531240545908_n.jpg) no-repeat center",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="profile-details">
          <div className="profile-img">
            <img src={profileImage} alt="" />
          </div>
        </div>
        <div className="intern-info">
          <div className="intern-details">
            <h3>
              {firstName} {lastName}
            </h3>
            <p className="program">{schoolDetails?.program}</p>
            <p className="program">{internshipDetails?.companyName}</p>
          </div>
          <div className="btn-edit">
            <button>Edit Profile</button>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="button-container">
          {buttons.map((item, index) => {
            const {path, btnName, code} = item;

            return (
              <button
                className={selected === code ? "active" : null}
                key={index}
                onClick={() => {
                  navigate(path);
                  setSelected(code);
                }}
              >
                {btnName}
              </button>
            );
          })}
        </div>
        <div className="display">
          <Routes>
            <Route path="/internsdetail" element={<InternsDetail />} />
            <Route path="/internshipdetail" element={<InternshipDetail />} />
            <Route path="/attendance" element={<AttendanceViewer />} />
            <Route path="/narrative" element={<Narrative />} />
            <Route path="/request" element={<Request />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Profile;
