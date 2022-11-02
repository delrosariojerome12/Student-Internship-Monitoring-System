import React from "react";
import {Route, Routes} from "react-router-dom";

import Profile from "../../components/user/Profile";
import DailyTimeRecord from "../../components/user/DailyTimeRecord";
import Documents from "../../components/user/Documents";
import Reports from "../../components/user/Reports";
import Settings from "../../components/user/Settings";

const Dashboard = () => {
  return (
    <section className="dashboard">
      <aside className="left-sidebar"></aside>
      <section className="content">
        <Routes>
          <Route path="/" element={<h1>dashboard</h1>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/daily-time-record" element={<DailyTimeRecord />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </section>
      <aside className="right-sidebar"></aside>
    </section>
  );
};

export default Dashboard;
