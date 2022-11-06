import React from "react";
import {Route, Routes, Link} from "react-router-dom";

import {lazy, Suspense} from "react";

import DashboardMain from "./DashboardMain";
import SidebarLeft from "../../components/dashboard/SidebarLeft";
import RightSidebar from "../../components/dashboard/RightSidebar";
import PageNotFound from "../PageNotFound";
import {useSelector} from "react-redux";

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
          <Route path="/" element={<DashboardMain />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/daily-time-record" element={<DailyTimeRecord />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <RightSidebar />
    </section>
  );
};

export default Dashboard;
