import React from "react";
import { Route, Routes, Link } from "react-router-dom";

import { useState, lazy, Suspense } from "react";

import SidebarLeft from "../../components/dashboard/SidebarLeft";
import RightSidebar from "../../components/dashboard/RightSidebar";

const Profile = lazy(() => import("./Profile"));
const DailyTimeRecord = lazy(() => import("./DailyTimeRecord"));
const Documents = lazy(() => import("./Documents"));
const Reports = lazy(() => import("./Reports"));
const Settings = lazy(() => import("./Settings"));

const Dashboard = () => {
  return (
    <section className="dashboard">
      <SidebarLeft />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<h1>SIMS</h1>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/daily-time-record" element={<DailyTimeRecord />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>

      <section className="main">
        <div className="name"></div>
        <div className="dashboard-content">
          <div className="time-keeper"></div>
          <div className="documents"></div>
          <div className="intern-details"></div>
          <div className="map"></div>
        </div>
      </section>

      <RightSidebar />
    </section>
  );
};

export default Dashboard;
