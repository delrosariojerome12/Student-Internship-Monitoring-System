import React from "react";
import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import Completion from "./documents/Completion";
import Requirments from "./documents/Requirments";
import ViewAsPdf from "./documents/ViewAsPdf";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";

const buttons = [
  {
    path: "/dashboard/documents/requirments",
    btnName: "Requirments",
  },
  {
    path: "/dashboard/documents/completion",
    btnName: "Completion",
  },
  {
    path: "/dashboard/documents/viewaspdf",
    btnName: "ViewAsPdf",
  },
];
const Documents = () => {
  const navigate = useNavigate();

  return (
    <section className="documents-page">
      <div className="top">
        <div className="private-comment">
          <div className="one">
            <span>
              <FaRegCommentDots />
            </span>
            <p>Private Comment</p>
          </div>
          <div className="two">
            <p>Add comment to the administrator</p>
          </div>
        </div>
        <div className="drop-file">
          <div className="drop-file-container">
            <div className="add-icon">
              <span>
                <AiOutlineFileAdd />
              </span>
            </div>
            <div className="add-file-text">
              <h5>Drag and drop files, or Browse</h5>
              <p>Support zip or rar files</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
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
        <div className="display">
          <Routes>
            <Route path="/requirments" element={<Requirments />} />
            <Route path="/completion" element={<Completion />} />
            <Route path="/ViewAsPdf" element={<ViewAsPdf />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Documents;
