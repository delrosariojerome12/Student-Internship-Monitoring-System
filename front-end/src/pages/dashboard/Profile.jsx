import React from "react";
import {Route, Routes, Link, Navigate, useNavigate} from "react-router-dom";
import InternsDetail from "./profile/InternsDetail";
import InternshipDetail from "./profile/InternshipDetail";
import Attendance from "./profile/Attendance";
import Narrative from "./profile/Narrative";
import Request from "./profile/Request ";
import {useSelector} from "react-redux";

const buttons = [
  {
    path: "/dashboard/profile/internsDetail",
    btnName: "Interns Detail",
  },
  {
    path: "/dashboard/profile/internshipDetail",
    btnName: "Internship Detail",
  },
  {
    path: "/dashboard/profile/attendance",
    btnName: "Attendance",
  },
  {
    path: "/dashboard/profile/narrative",
    btnName: "Narrative",
  },
  {
    path: "/dashboard/profile/request",
    btnName: "Request",
  },
];

const Profile = () => {
  const navigate = useNavigate();

  const {
    user: {
      user: {firstName, lastName, profileImage},
      schoolDetails,
      internshipDetails,
    },
  } = useSelector((state) => state.user);

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
            const {path, btnName} = item;
            return (
              <button key={index} onClick={() => navigate(path)}>
                {btnName}
              </button>
            );
          })}
        </div>
        <div className="display">
          <Routes>
            <Route path="/internsdetail" element={<InternsDetail />} />
            <Route path="/internshipdetail" element={<InternshipDetail />} />
            <Route path="/attendance" element={<Attendance />} />
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
