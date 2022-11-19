import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {lazy, Suspense} from "react";
import {useSelector} from "react-redux";

import DashboardMain from "./DashboardMain";
import Pending from "../Pending";
import SidebarLeft from "../../components/dashboard/SidebarLeft";
import SideBarRight from "../../components/dashboard/SidebarRight";

const Profile = lazy(() => import("./Profile"));
const DailyTimeRecord = lazy(() => import("./DailyTimeRecord"));
const Documents = lazy(() => import("./Documents"));
const Reports = lazy(() => import("./Reports"));
const Settings = lazy(() => import("./Settings"));

const Dashboard = () => {
  const {isSidebarOpen} = useSelector((state) => state.dashboard);
  const {user} = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  if (!user && !localStorage.getItem("token")) {
    return <Navigate to={"/404"} />;
  }
  const isValidated = user.isValidated;

  // not validated
  if (!isValidated) {
    return (
      <section
        style={isSidebarOpen ? {padding: "2rem 9rem 2rem 29rem"} : null}
        className="dashboard"
      >
        <SidebarLeft />
        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            <Route path="/" element={<Pending />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
        <SideBarRight />
      </section>
    );
  }

  return (
    <section
      style={isSidebarOpen ? {padding: "2rem 9rem 2rem 29rem"} : null}
      className="dashboard"
    >
      <SidebarLeft />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<DashboardMain />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/daily-time-record" element={<DailyTimeRecord />} />
          <Route path="/documents/*" element={<Documents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
      <SideBarRight />
    </section>
  );
};

export default Dashboard;
