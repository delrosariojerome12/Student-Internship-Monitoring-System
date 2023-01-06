import React from "react";
import {Routes, Route, Navigate} from "react-router";
import Verification from "./Verification";
import Pending from "./Pending";
import {useSelector} from "react-redux";
import Waiting from "./Waiting";

const PendingContainer = React.memo(() => {
  const {user} = useSelector((state) => state.user);

  const {
    verification: {hasSentVerification, isRejected},
  } = user;
  // const {hasSentVerification, isRejected} = verification;

  // already sent request
  if (hasSentVerification) {
    return (
      <Routes>
        <Route path="/" element={<Waiting user={user} />} />
        <Route
          path="/verification"
          element={<Navigate to="/dashboard" replace />}
        />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    );
  }

  if (isRejected) {
    return (
      <Routes>
        <Route path="/" element={<Waiting user={user} />} />
        <Route path="/verification" element={<Verification />} />
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
