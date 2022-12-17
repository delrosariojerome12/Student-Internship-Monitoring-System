import React from "react";
import {Routes, Route, Navigate} from "react-router";
import Verification from "./Verification";
import Pending from "./Pending";
import {useSelector} from "react-redux";
import Waiting from "./Waiting";

const PendingContainer = React.memo(() => {
  const {
    user: {
      verification: {hasSentVerification},
    },
  } = useSelector((state) => state.user);

  // already sent request
  if (hasSentVerification) {
    return (
      <Routes>
        <Route path="/" element={<Waiting />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Pending />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
});

export default PendingContainer;
