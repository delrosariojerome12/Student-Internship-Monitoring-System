import React, {useEffect} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {lazy, Suspense} from "react";
import SidebarLeft from "../../components/dashboard/SidebarLeft";
import SideBarRight from "../../components/dashboard/SidebarRight";
import {useDispatch, useSelector} from "react-redux";
import {handleGetDocuments} from "../../features/admin/document";
import Bouncing from "../../components/loading/Bouncing";
import ServerError from "../serverError";

const Documents = lazy(() => import("./Documents"));

const Admin = React.memo(() => {
  const {isLoading, isError, documents} = useSelector(
    (state) => state.document
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetDocuments());
  }, []);

  if (isLoading) {
    return <Bouncing />;
  }

  if (isError) {
    return <ServerError />;
  }

  return (
    <section className="dashboard">
      <SidebarLeft />
      <Suspense fallback={<Bouncing />}>
        <Routes>
          <Route path="/" element={<h1>ADMIN</h1>} />
          <Route path="/documents" element={<Documents />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
      <SideBarRight />
    </section>
  );
});

export default Admin;
