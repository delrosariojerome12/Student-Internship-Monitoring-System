import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {lazy, Suspense} from "react";
import {useSelector} from "react-redux";
import {auth} from "../../Firebase";

import DashboardMain from "./DashboardMain";
import PendingContainer from "../verification/PendingContainer";
import SidebarLeft from "../../components/dashboard/SidebarLeft";
import SideBarRight from "../../components/dashboard/SidebarRight";

import Coordinator from "../coordinator/Coordinator";
import Admin from "../admin/Admin";

import Bouncing from "../../components/loading/Bouncing";

const Profile = lazy(() => import("./Profile"));
const DailyTimeRecord = lazy(() => import("./DailyTimeRecord"));
const Documents = lazy(() => import("./Documents"));
const Reports = lazy(() => import("./Reports"));
const Settings = lazy(() => import("./Settings"));

const Dashboard = () => {
  const {isSidebarOpen} = useSelector((state) => state.dashboard);
  const {user} = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  if (!user) {
    return <Bouncing />;
  }

  if (!user && !localStorage.getItem("token")) {
    return <Navigate to={"/404"} />;
  }

  if (user.user.role === "coordinator") {
    return <Coordinator isSidebarOpen={isSidebarOpen} />;
  }

  if (user.user.role === "admin") {
    return <Admin isSidebarOpen={isSidebarOpen} />;
  }

  const isVerified = user.verification.isVerified;
  // not validated
  if (!isVerified) {
    return (
      <section
        style={isSidebarOpen ? {padding: "2rem 9rem 2rem 29rem"} : null}
        className="dashboard"
      >
        <SidebarLeft />
        <Suspense fallback={<Bouncing />}>
          <Routes>
            <Route path="/*" element={<PendingContainer />} />
            {/* <Route path="/settings" element={<Settings />} /> */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
        <SideBarRight />
      </section>
    );
  }

  // intern
  return (
    <section
      style={isSidebarOpen ? {padding: "2rem 9rem 2rem 29rem"} : null}
      className="dashboard"
    >
      <SidebarLeft />
      <Suspense fallback={<Bouncing />}>
        <Routes>
          <Route path="/" element={<DashboardMain />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/daily-time-record" element={<DailyTimeRecord />} />
          <Route path="/documents/*" element={<Documents />} />
          <Route path="/reports/*" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
      <SideBarRight />
    </section>
  );
};

export default Dashboard;
