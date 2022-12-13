import React from "react";

import { GoSearch } from "react-icons/go";

const Documents = () => {
  return (
    <section className="admin-documents">
      <header>
        <div className="search-box">
          {/* <img src={searchIcon} alt="" /> */}
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
          <div className="box"></div>
        </div>
      </div>
    </section>
  );
};

export default Documents;
