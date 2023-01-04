import React from "react";

import { GoSearch } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
const Documents = () => {
  return (
    <section className="admin-documents">
      <div className="create-modal">
        <div className="folders">
          <div className="folder-name">
            <p>Folder Name</p>
            <input type="text" />
          </div>
          <div className="subject">
            <p>Subject</p>
            <input type="text" />
          </div>
        </div>
        {/* <div className="modal-btn"> */}
        <button>Create</button>
        {/* </div> */}
      </div>

      <div className="requirments-modal">
        <div className="file-name">
          <div className="requirements-name">
            <p>Requirment's Name</p>
            <input type="text" />
          </div>
          <div className="subject-req">
            <p>Subject</p>
            <input type="text" />
          </div>
        </div>
        {/* <div className="modal-btn"> */}
        <button>Create</button>
        {/* </div> */}
      </div>

      <div className="delete-modal">
        <div className="delete-icon">
          <span>
            <FaTrash />
          </span>
          <h3>Are you sure do want to delete?</h3>
          <h5>You can't recover it once you delete it</h5>
        </div>
        <div className="delete-btn">
          <button className="back">Back</button>
          <button className="confirm">Confirm</button>
        </div>
      </div>

      <header>
        <div className="search-box">
          <span>
            <GoSearch />
          </span>
          <input type="text" placeholder="Search" />
        </div>
      </header>
      <div className="documents-content">
        <div className="inputs">
          <input type="text" />
        </div>
        <div className="buttons">
          <button className="create">Create</button>
          <button className="edit">Edit</button>
          <button className="delete">Delete</button>
        </div>
        <div className="files-container">
          <div>
            <span>
              <FaTrash />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documents;
