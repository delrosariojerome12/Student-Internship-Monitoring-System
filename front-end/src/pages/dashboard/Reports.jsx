/** @format */

import React, { useEffect, useState } from "react";
import { FaSortAmountUp, FaRegCalendarCheck, FaFilter } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getAllNarrative } from "../../features/interns/narrativeReducer";
import ReportContent from "../../components/intern/NarrativeContent";
import Bouncing from "../../components/loading/Bouncing";
import ServerError from "../serverError";
import _ from "lodash";

import AddModal from "../../components/intern/reports/AddModal";
import EditModal from "../../components/intern/reports/EditModal";
import ViewModal from "../../components/intern/reports/ViewModal";
import ReactPDF from "../../components/utils/ReactPDF";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import ApprovalWaiting from "../../assets/img/waiting.svg";

const Reports = React.memo(() => {
  const {
    user: {
      user: { email },
    },
  } = useSelector((state) => state.user);

  const {
    allNarrative,
    isError,
    isLoading,
    isAddModalOpen,
    isEditModalOpen,
    isViewModalOpen,
    isGenerateOpen,
  } = useSelector((state) => state.narrative);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNarrative({ email }));
  }, []);

  if (isError) {
    return <ServerError />;
  }
  if (isLoading || !allNarrative) {
    return <Bouncing />;
  }

  const renderNarrative = () => {
    if (allNarrative.length === 0) {
      return (
        <div className="no-content">
          <h3>
            No <b>Reports</b> Found.
          </h3>
          <img src={ApprovalWaiting} alt="waiting" />
        </div>
      );
    }
    const groupNarrative = _.chunk(allNarrative, 5);
    return (
      <div className="report-container">
        {groupNarrative.map((item, index) => {
          return <ReportContent report={item} key={index} week={index} />;
        })}
      </div>
    );
  };

  return (
    <section className="reports">
      <div className="content">
        {/* <div className="button-container">
          <button className="sort">
            <span>
              <FaSortAmountUp />
            </span>
            <p>Sort</p>
          </button>
          <button className="status">
            <span>
              <FaRegCalendarCheck />
            </span>
            <p>Status</p>
          </button>
          <button className="filters">
            <span>
              <FaFilter />
            </span>
            <p>Filters</p>
          </button>
        </div> */}
        <header>
          <h2>Reports</h2>
        </header>
        {renderNarrative()}
      </div>

      {isAddModalOpen && <AddModal />}
      {isEditModalOpen && <EditModal />}
      {isViewModalOpen && <ViewModal />}
      {isGenerateOpen && (
        <>
          <div className="overlay"></div>
          <ReactPDF />
        </>
      )}

      {/* <div className="sort-modals">
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
      <div className="status-modals">
        <h3>Status</h3>
        <div className="modals-status">
          <div className="complete-task">
            <div className="top">
              <p>Complete</p>
              <label>
                <input type="checkbox" />
                <p>Complete Task</p>
              </label>
            </div>
            <span>
              <MdOutlineArrowForwardIos />
            </span>
          </div>
          <div className="pending-task">
            <div className="top">
              <p>Pending</p>
              <label>
                <input type="checkbox" />
                <p>Pending Task</p>
              </label>
            </div>
            <span>
              <MdOutlineArrowForwardIos />
            </span>
          </div>
          <div className="missing-task">
            <div className="top">
              <p>Missing</p>
              <label>
                <input type="checkbox" />
                <p>Missing Task</p>
              </label>
            </div>
            <span>
              <MdOutlineArrowForwardIos />
            </span>
          </div>
        </div>
      </div>
      <div className="filter-modals">
        <h3>Filter</h3>
        <div className="modals-status">
          <div className="week-filter">
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
          <div className="month-filter">
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
          <div className="year-filter">
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
        </div>
      </div>
      <div className="week-modals">
        <div className="week-container">
          <div className="week-labels-container">
            <div className="top">
              <label>
                <p>Week 1</p>
                <input type="checkbox" />
              </label>
              <label>
                <p>Week 2</p>
                <input type="checkbox" />
              </label>
              <label>
                <p>Week 3</p>
                <input type="checkbox" />
              </label>
              <label>
                <p>Week 4</p>
                <input type="checkbox" />
              </label>
              <label>
                <p>Week 5</p>
                <input type="checkbox" />
              </label>
            </div>
            <span>
              <MdOutlineArrowBackIosNew />
            </span>
          </div>
        </div>
      </div>
      <div className="month-modals">
        <div className="month-container">
          <div className="month-labels-container">
            <div className="top">
              <label>
                <input type="checkbox" />
                <p>January</p>
              </label>
              <label>
                <input type="checkbox" />
                <p>February</p>
              </label>
              <label>
                <input type="checkbox" />
                <p>March</p>
              </label>
              <label>
                <input type="checkbox" />
                <p>April</p>
              </label>
              <label>
                <input type="checkbox" />
                <p>May</p>
              </label>
              <label>
                <input type="checkbox" />
                <p>June</p>
              </label>
              <label>
                <input type="checkbox" />
                <p>July</p>
              </label>
              <label>
                <input type="checkbox" />
                <p>August</p>
              </label>
              <label>
                <input type="checkbox" />
                <p>September</p>
              </label>
              <label>
                <input type="checkbox" />
                <p>October</p>
              </label>
              <label>
                <input type="checkbox" />
                <p>November</p>
              </label>
              <label>
                <input type="checkbox" />
                <p>December</p>
              </label>
            </div>
            <span>
              <MdOutlineArrowBackIosNew />
            </span>
          </div>
        </div>
      </div>
      <div className="year-modals">
        <div className="year-container">
          <div className="year-labels-container">
            <div className="top">
              <label>
                <input type="checkbox" />
                <p>2022</p>
              </label>
              <label>
                <input type="checkbox" />
                <p>2021</p>
              </label>
            </div>
            <span>
              <MdOutlineArrowBackIosNew />
            </span>
          </div>
        </div>
      </div> */}
    </section>
  );
});

export default Reports;
