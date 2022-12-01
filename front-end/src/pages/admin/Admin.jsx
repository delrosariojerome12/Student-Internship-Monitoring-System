import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {lazy, Suspense} from "react";
import SidebarLeft from "../../components/dashboard/SidebarLeft";
import SideBarRight from "../../components/dashboard/SidebarRight";

const Admin = React.memo(({isSidebarOpen}) => {
  return (
    <section
      style={isSidebarOpen ? {padding: "2rem 9rem 2rem 29rem"} : null}
      className="dashboard"
    >
      <SidebarLeft />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<h1>ADMIN</h1>} />
          {/* <Route path="/profile/*" element={<Profile />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
      <SideBarRight />
    </section>
  );
});

export default Admin;
