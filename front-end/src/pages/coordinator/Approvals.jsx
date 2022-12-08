import React from "react";
import searchIcon from "../../assets/img/search.svg";
import ApprovalIntern from "../../components/coordinator/ApprovalIntern";
import { GoSearch } from "react-icons/go";
const Approvals = () => {
  return (
    <section className="approvals-container">
      <header>
        <div className="search-box">
          {/* <img src={searchIcon} alt="" /> */}
          <span>
            <GoSearch />
          </span>
          <input type="text" placeholder="Search" />
        </div>
      </header>
      <div className="approvals-content">
        <div className="user1">
          <div className="img-container"></div>
          <div className="intern-infos"></div>
        </div>
      </div>
    </section>
  );
};

export default Approvals;
