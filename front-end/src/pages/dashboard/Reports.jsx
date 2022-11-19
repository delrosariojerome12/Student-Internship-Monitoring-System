import React from "react";
import {Route, Routes, Link, Navigate, useNavigate} from "react-router-dom";
import Narrative from "./reports/Narrative";
import Summary from "./reports/Summary";
import ViewAsPdf from "./reports/ViewAsPdf";

const buttons = [
  {
    path: "/dashboard/reports/narrative",
    btnName: "Narrative",
  },
  {
    path: "/dashboard/reports/summary",
    btnName: "Summary",
  },
  {
    path: "/dashboard/reports/viewaspdf",
    btnName: "ViewAsPdf",
  },
];

const Reports = () => {
  const navigate = useNavigate();

  return (
    <section className="reports">
      <div className="content">
        <div className="button-container">
          {buttons.map((item, index) => {
            const {path, btnName} = item;
            return (
              <button key={index} onClick={() => navigate(path)}>
                {btnName}
              </button>
            );
          })}
        </div>
        <div className="display">
          <Routes>
            <Route path="/narrative" element={<Narrative />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/viewaspdf" element={<ViewAsPdf />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Reports;
