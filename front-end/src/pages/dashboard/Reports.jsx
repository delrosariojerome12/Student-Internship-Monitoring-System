/** @format */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllNarrative,
  handleNarrativeSample,
} from "../../features/interns/narrativeReducer";
import ReportContent from "../../components/intern/NarrativeContent";
import Bouncing from "../../components/loading/Bouncing";
import ServerError from "../serverError";
import _ from "lodash";

import AddModal from "../../components/intern/reports/AddModal";
import EditModal from "../../components/intern/reports/EditModal";
import ViewModal from "../../components/intern/reports/ViewModal";
import ReactPDF from "../../components/utils/ReactPDF";

import ApprovalWaiting from "../../assets/img/waiting.svg";

import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

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
    isNarrativeSampleOpen,
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
        <header>
          <h2>Reports</h2>
          <div className="btn-view">
            <button onClick={() => dispatch(handleNarrativeSample())}>
              View Sample Narrative
            </button>
          </div>
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
      {isNarrativeSampleOpen && (
        <>
          <div
            onClick={() => dispatch(handleNarrativeSample())}
            className="overlay"></div>
          <div className="sample-view-container">
            <Viewer fileUrl="https://firebasestorage.googleapis.com/v0/b/sims-9f681.appspot.com/o/images%2Fdocuments%2Fsample%2FJake-A.-Bristol-Complete.pdf?alt=media&token=28af534d-3d01-47ce-ab26-8068a2d96d28" />
          </div>
        </>
      )}
    </section>
  );
});

export default Reports;
