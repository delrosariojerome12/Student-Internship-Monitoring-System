import React from "react";
import Approval from "../../components/coordinator/ApprovalIntern";
import {useSelector, useDispatch} from "react-redux";

import {GoSearch} from "react-icons/go";

const Approvals = () => {
  const {interns, isLoading, isError} = useSelector((state) => state.intern);

  const renderApprovals = () => {
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    return interns.map((intern, index) => {
      return <Approval intern={intern} key={index} />;
    });
  };

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
      <div className="approvals-content">{renderApprovals()}</div>
    </section>
  );
};

export default Approvals;
