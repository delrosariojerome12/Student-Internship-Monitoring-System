import React from "react";
import {Route, Routes, Link, Navigate, useNavigate} from "react-router-dom";
import Summary from "./profile/Summary";
import Performance from "./profile/Performance";
import TimeKeeping from "./profile/TimeKeeping";
import ActivityLog from "./profile/ActivityLog";

const buttons = [
  {
    path: "/dashboard/profile/summary",
    btnName: "Summary",
  },
  {
    path: "/dashboard/profile/peformance",
    btnName: "Performance",
  },
  {
    path: "/dashboard/profile/timekeeping",
    btnName: "Time Keeping",
  },
  {
    path: "/dashboard/profile/activitylog",
    btnName: "Activity Log",
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
          }}
        ></div>
        <div className="profile-details">
          <div className="profile-img">
            <img src="https://i.imgur.com/aFPFvGv.jpg" alt="" />
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
            <Route path="/summary" element={<Summary />} />
            <Route path="/peformance" element={<Performance />} />
            <Route path="/timekeeping" element={<TimeKeeping />} />
            <Route path="/activitylog" element={<ActivityLog />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Profile;
