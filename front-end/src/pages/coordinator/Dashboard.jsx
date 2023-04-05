/** @format */

import React, { useEffect } from "react";
import DashboardIntern from "../../components/coordinator/dashboardCoordinator/DashboardIntern";
import DashboardApprovals from "../../components/coordinator/dashboardCoordinator/DashboardApprovals";
import Approval from "../../components/coordinator/ApprovalIntern";
import { useSelector, useDispatch } from "react-redux";
import { getAllInterns } from "../../features/interns/internReducer";
import { BiSearchAlt } from "react-icons/bi";

import NoIntern from "../../assets/img/head.svg";
import NoApprovals from "../../assets/img/approvals.svg";
import NoInternship from "../../assets/img/waiting.svg";

const Dashboard = React.memo(() => {
  const { approvalInterns, interns, isError } = useSelector(
    (state) => state.intern
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInterns());
  }, []);

  const renderInterns = () => {
    if (!interns) {
      return <h1>Loading...</h1>;
    }
    if (
      interns.filter((intern) => intern.verification.isVerified).length === 0
    ) {
      return (
        <section className="dashboard-intern">
          <div className="no-intern">
            <img src={NoIntern} alt="" className="no-intern-img" />
            <h3>No verified intern found!</h3>
          </div>
        </section>
      );
    }

    // can make conditional
    return interns
      .filter((intern) => intern.verification.isVerified)
      .map((intern, index) => {
        return <DashboardIntern intern={intern} key={index} />;
      });
  };

  const renderApprovals = () => {
    if (!approvalInterns) {
      return <h1>loading...</h1>;
    }

    if (approvalInterns.length === 0) {
      return (
        <section className="dashboard-approvals">
          <div className="no-approvals">
            <img src={NoApprovals} alt="Approvals waiting image" />
            <h3>No verified approval found!</h3>
          </div>
        </section>
      );
    }

    return approvalInterns.map((intern, index) => {
      return <Approval intern={intern} key={index} index={index} />;
    });
  };

  return (
    <section className="coordinator-dashboard">
      <header>
        <div className="name-greet">
          <h1>
            Hello, <b>Coordinator</b>
          </h1>
          <h4> Welcome Back!</h4>
        </div>
        <div className="search-bar">
          <span>
            <BiSearchAlt />
          </span>
          <input placeholder="Search" type="text" />
        </div>
      </header>
      <div className="dashboard-content">
        <div className="dashboard-intern">
          <h4 className="container-title">Interns</h4>
          <div className="all-intern-container">{renderInterns()}</div>
        </div>

        <div className="dashboard-approvals">
          <h3 className="approvals-title">Approvals</h3>
          <div className="all-approvals-container">{renderApprovals()}</div>
        </div>

        <div className="dashboard-internships">
          <h3 className="internships-title">Internships</h3>
          <div className="all-internship-container">{renderApprovals()}</div>
        </div>
      </div>
    </section>
  );
});

export default Dashboard;
