import React from "react";
import {Route, Routes, Link} from "react-router-dom";

import {useState, lazy, Suspense} from "react";

const Profile = lazy(() => import("./Profile"));
const DailyTimeRecord = lazy(() => import("./DailyTimeRecord"));
const Documents = lazy(() => import("./Documents"));
const Reports = lazy(() => import("./Reports"));
const Settings = lazy(() => import("./Settings"));

const links = [
  {
    path: "/dashboard",
    link: "Dashboard",
  },
  {
    path: "/dashboard/profile",
    link: "Profile",
  },
  {
    path: "/dashboard/daily-time-record",
    link: "Daily Time Record",
  },
  {
    path: "/dashboard/documents",
    link: "Documents",
  },
  {
    path: "/dashboard/reports",
    link: "Reports",
  },
  ,
  {
    path: "/dashboard/settings",
    link: "Settings",
  },
];

const Dashboard = () => {
  return (
    <section className="dashboard">
      <aside className="left-sidebar">
        {links.map((item, index) => {
          const {path, link} = item;
          return (
            <Link to={path} key={index}>
              {link}
            </Link>
          );
        })}
      </aside>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<h1>dashboard</h1>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/daily-time-record" element={<DailyTimeRecord />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
      <aside className="right-sidebar"></aside>
    </section>
  );
};

export default Dashboard;
