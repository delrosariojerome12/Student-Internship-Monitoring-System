/** @format */

import React from "react";
import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import InternsDetail from "./profile/InternsDetail";
import InternshipDetail from "./profile/InternshipDetail";
import Attendance from "./profile/Attendance";
import Narrative from "./profile/Narrative";
import Request from "./profile/Request ";

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
  return (
    <section className="profile-page">
      <div className="profile-user">
        <div
          className="profile-bg"
          style={{
            background:
              "url(https://animes.olanerd.com/wp-content/uploads/2022/10/1666371202_Bocchi-The-Rock-Os-passos-de-Hitori-para-o-auto-aperfeicoamento.jpg) no-repeat center",
            backgroundSize: "cover",
          }}></div>
        <div className="profile-details">
          <div className="profile-img">
            <img src="https://i.imgur.com/aFPFvGv.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="content">
        <div className="button-container">
          {buttons.map((item, index) => {
            const { path, btnName } = item;
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
