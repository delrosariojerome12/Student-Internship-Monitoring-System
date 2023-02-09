import React, {useEffect} from "react";
import DashboardIntern from "../../components/coordinator/dashboardCoordinator/DashboardIntern";
import DashboardApprovals from "../../components/coordinator/dashboardCoordinator/DashboardApprovals";

import {useSelector, useDispatch} from "react-redux";
import {getAllInterns} from "../../features/interns/internReducer";
import {BiSearchAlt} from "react-icons/bi";

import internImg from "../../assets/img/head.svg";
import approvalImg from "../../assets/img/approvals.svg";

const Dashboard = () => {
  const {approvalInterns, interns, isError} = useSelector(
    (state) => state.intern
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInterns());
    console.log(interns);
  }, []);

  const renderInterns = () => {
    if (!interns) {
      return <h1>Loading...</h1>;
    }

    if (interns.length === 0) {
      return (
        <section className="all-intern-container">
          <div className="no-intern">
            <img src={internImg} alt="" className="no-intern-img" />
            <h3>No user found!</h3>
          </div>
        </section>
      );
    }

    // can make conditional
    return (
      interns
        // .filter((intern) => intern.verification.isVerified)
        .map((intern, index) => {
          return <DashboardIntern intern={intern} key={index} />;
        })
    );
  };

  const renderApprovals = () => {
    if (!approvalInterns) {
      return <h1>loading...</h1>;
    }

    if (approvalInterns.length === 0) {
      return (
        <section className="all-approvals-container">
          <div className="no-approvals">
            <img src={approvalImg} alt="No Intern Found" />
            <h4>No approvals found!</h4>
          </div>
        </section>
      );
    }

    return approvalInterns.map((intern, index) => {
      return <DashboardApprovals intern={intern} key={index} index={index} />;
    });
  };

  // const renderInternship = () => {
  //   if (approvalInterns.length === 0) {
  //     return (
  //       <section className="all-internship-container">
  //         <div className="no-internship">
  //           <img src={internshipImg} alt="No available internship" />
  //           <h4>No available internship</h4>
  //         </div>
  //       </section>
  //     );
  //   }

  //   return approvalInterns.map((intern, index) => {
  //     return <DashboardInternship intern={intern} key={index} index={index} />;
  //   });
  // };

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
        <h4 className="container-title">Interns</h4>
        {/* <h4 className="course">
          Bachelor of Science in Information Technology
        </h4> */}
        <div className="all-intern-container">{renderInterns()}</div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-approvals">
          <h3 className="approvals-title">Approvals</h3>
          {/* <h4 className="course">
            Bachelor of Science in Information Technology
          </h4> */}
          <div className="all-approvals-container">{renderApprovals()}</div>
        </div>
        <div className="dashboard-internships">
          <h3 className="internships-title">Companies</h3>
          <div className="all-internship-container">
            {/* {renderInternship()} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
