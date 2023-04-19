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
import NoInternship from "../../assets/img/no-internship.svg";
import { getAllInternship } from "../../features/coordinator/internship";

import Internship from "../../components/coordinator/Internship";
const Dashboard = React.memo(() => {
  const { approvalInterns, interns, isError } = useSelector(
    (state) => state.intern
  );
  const { internships } = useSelector((state) => state.internship);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInterns());
    dispatch(getAllInternship());
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
      .sort((a, b) => {
        return (
          parseFloat(b.internshipDetails.renderedHours) -
          parseFloat(a.internshipDetails.renderedHours)
        );
      })
      .splice(0, 10)
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

    let dashboardApprovals = [...approvalInterns].splice(0, 5);

    return dashboardApprovals.map((intern, index) => {
      return <Approval intern={intern} key={index} index={index} />;
    });
  };

  const renderInternships = () => {
    if (!internships) {
      return <h1>loading...</h1>;
    }
    if (internships.length === 0) {
      return (
        <section className="dashboard-internships">
          <div className="no-internships">
            <img src={NoInternship} alt="Internship waiting image" />
            <h3>No internship found</h3>
          </div>
        </section>
      );
    }

    const dashboardInternships = [...internships]
      .sort((a, b) => b.students - a.students)
      .splice(0, 5);

    return dashboardInternships.map((item, index) => {
      const {
        logo: { link },
        companyName,
        students,
      } = item;
      return (
        <div className="internship" key={index}>
          <div className="img-con">
            <img src={link} alt={companyName} />
          </div>
          <div className="text">
            <h4>{companyName}</h4>
            <p>No. of Interns: {students}</p>
          </div>
        </div>
      );
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
          <div className="all-internship-container">{renderInternships()}</div>
        </div>
      </div>
    </section>
  );
});

export default Dashboard;
