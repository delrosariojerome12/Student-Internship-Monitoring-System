import React from "react";
import DashboardIntern from "../../components/coordinator/dashboardCoordinator/DashboardIntern";
import DashboardApprovals from "../../components/coordinator/dashboardCoordinator/DashboardApprovals";
import DashboardInternship from "../../components/coordinator/dashboardCoordinator/DashboardInternship";

import { useSelector, useDispatch } from "react-redux";
import { BiSearchAlt } from "react-icons/bi";

import internImg from "../../assets/img/head.svg";
import approvalImg from "../../assets/img/approvals.svg";

const Dashboard = () => {
  const { approvalInterns, interns, isError } = useSelector(
    (state) => state.intern
  );

  const renderInterns = () => {
    if (!interns) {
      return <h1>Loading...</h1>;
    }

    if (interns.length === 0) {
      return (
        <section className="dashboard-intern">
          <div className="no-intern">
            <div className="internt-waiting">
              <img src={internImg} alt="" />
            </div>
            <h4>No user found!</h4>
          </div>
        </section>
      );
    }
    return interns.map((intern, index) => {
      return <DashboardIntern intern={intern} key={index} />;
    });
  };

  const renderApprovals = () => {
    if (!approvalInterns) {
      return <h1>loading...</h1>;
    }

    if (approvalInterns.length === 0) {
      <section className="dashboard-approvals">
        <div className="no-approvals">
          <div className="approval-waiting">
            <img src={approvalImg} alt="" />
          </div>
          <h4>No approvals found!</h4>
        </div>
      </section>;
    }

    return approvalInterns.map((intern, index) => {
      return <DashboardApprovals intern={intern} key={index} index={index} />;
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

      <div className="dashboard-intern">
        <div>
          <h4>Interns</h4>
        </div>
        <div className="all-intern-container">{renderInterns()}</div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-approvals">
          <h3 className="approvals-title">Approvals</h3>
          <div className="all-approvals-container">{renderApprovals()}</div>
        </div>
        <div className="dashboard-internships">
          <h3 className="internships-title">Companies</h3>
          <div className="all-internship-container">
            {DashboardInternship()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
