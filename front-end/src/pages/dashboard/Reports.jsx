import React from "react";
import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import Narrative from "./reports/Narrative";
import Summary from "./reports/Summary";
import ViewAsPdf from "./reports/ViewAsPdf";

import { MdOutlineArrowForwardIos } from "react-icons/md";

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
      <div className="report-modals">
        <h3>Sort by</h3>
        <div className="modals-sorting">
          <div className="day">
            <div className="top">
              <p>Day</p>
              <label>
                <input type="checkbox" />
                <p>Entire Day</p>
              </label>
            </div>
            <span>
              <MdOutlineArrowForwardIos />
            </span>
          </div>
          <div className="week">
            <div className="top">
              <p>Week</p>
              <label>
                <input type="checkbox" />
                <p>Entire Week</p>
              </label>
            </div>
            <span>
              <MdOutlineArrowForwardIos />
            </span>
          </div>
          <div className="month">
            <div className="top">
              <p>Month</p>
              <label>
                <input type="checkbox" />
                <p>Entire Month</p>
              </label>
            </div>
            <span>
              <MdOutlineArrowForwardIos />
            </span>
          </div>
          <div className="year">
            <div className="top">
              <p>Year</p>
              <label>
                <input type="checkbox" />
                <p>Entire Year</p>
              </label>
            </div>
            <span>
              <MdOutlineArrowForwardIos />
            </span>
          </div>
          <div className="a-z-order">
            <div className="a-z-order-container">
              <p>A-Z Order</p>
              <div className="ascending">
                <label>
                  <input type="checkbox" />
                  <p>Ascending</p>
                </label>
                <label className="descending">
                  <input type="checkbox" />
                  <p>Descending</p>
                </label>
              </div>
            </div>
            <span>
              <MdOutlineArrowForwardIos />
            </span>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="button-content">
          <div className="button-container">
            {buttons.map((item, index) => {
              const { path, btnName } = item;
              return (
                <button key={index} onClick={() => navigate(path)}>
                  {btnName}
                </button>
              );
            })}
          </div>
          <div className="dotted-button"></div>
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
