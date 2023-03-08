import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {lazy, Suspense} from "react";
import SidebarLeft from "../../components/dashboard/SidebarLeft";
import SideBarRight from "../../components/dashboard/SidebarRight";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getAllInterns} from "../../features/interns/internReducer";

import Bouncing from "../../components/loading/Bouncing";

const Dashboard = lazy(() => import("./Dashboard"));
const Approvals = lazy(() => import("./Approvals"));
const Attendance = lazy(() => import("./Attendance"));
const Interns = lazy(() => import("./Interns"));
const Documents = lazy(() => import("./Documents"));
const Internships = lazy(() => import("./Internships"));

const Coordinator = React.memo(({isSidebarOpen}) => {
  const {isLoading, isError, interns} = useSelector((state) => state.intern);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllInterns());
  // }, []);

  return (
    <section
      // style={isSidebarOpen ? {padding: "2rem 9rem 2rem 29rem"} : null}
      className="dashboard"
    >
      <SidebarLeft />
      <Suspense fallback={<Bouncing />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/interns" element={<Interns />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/internships" element={<Internships />} />

          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
      <SideBarRight />
    </section>
  );
});

export default Coordinator;
