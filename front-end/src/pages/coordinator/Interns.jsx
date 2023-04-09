/** @format */

import React, {useState, useCallback, useEffect} from "react";
import Intern from "../../components/coordinator/Intern";
import {useSelector, useDispatch} from "react-redux";
import internWaiting from "../../assets/img/waiting.svg";
import {
  getAllInterns,
  handleInternModal,
} from "../../features/interns/internReducer";

import {BiSearchAlt} from "react-icons/bi";
import Bouncing from "../../components/loading/Bouncing";
import SelectedIntern from "../../components/coordinator/dashboardCoordinator/SelectedIntern";
import {useNavigate} from "react-router";

const Interns = React.memo(() => {
  const {interns, isError, selectedIntern, isInternOpen} = useSelector(
    (state) => state.intern
  );
  const [searchIntern, setSearchIntern] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderInterns = () => {
    if (!interns) {
      return <Bouncing />;
    }
    if (
      interns.filter((intern) => intern.verification.isVerified).length <= 0
    ) {
      return (
        <div className="interns">
          <div className="no-entries">
            <h3>
              There are no <b>interns</b> curently in the system
            </h3>
            <div className="img-waiting">
              <img src={internWaiting} alt="approval" />
            </div>
          </div>
        </div>
      );
    } else {
      if (sortValue) {
        switch (sortValue) {
          case "name-ascending":
            return (
              <div className="interns interns-active">
                {interns
                  .filter((intern) => intern.verification.isVerified)
                  .sort((a, b) => {
                    let fa = a.user.lastName.toLowerCase(),
                      fb = b.user.lastName.toLowerCase();

                    if (fa < fb) {
                      return -1;
                    }
                    if (fa > fb) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((intern, index) => {
                    return <Intern intern={intern} key={index} />;
                  })}
              </div>
            );

          case "name-descending":
            return (
              <div className="interns interns-active">
                {interns
                  .filter((intern) => intern.verification.isVerified)
                  .sort((a, b) => {
                    let fa = a.user.lastName.toLowerCase(),
                      fb = b.user.lastName.toLowerCase();

                    if (fa > fb) {
                      return -1;
                    }
                    if (fa < fb) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((intern, index) => {
                    return <Intern intern={intern} key={index} />;
                  })}
              </div>
            );
          case "time-ascending":
            return (
              <div className="interns interns-active">
                {interns
                  .filter((intern) => intern.verification.isVerified)
                  .sort((a, b) => {
                    return (
                      parseInt(a.internshipDetails.renderedHours) -
                      parseInt(b.internshipDetails.renderedHours)
                    );
                  })
                  .map((intern, index) => {
                    return <Intern intern={intern} key={index} />;
                  })}
              </div>
            );
          case "time-descending":
            return (
              <div className="interns interns-active">
                {interns
                  .filter((intern) => intern.verification.isVerified)
                  .sort((a, b) => {
                    return (
                      parseInt(b.internshipDetails.renderedHours) -
                      parseInt(a.internshipDetails.renderedHours)
                    );
                  })
                  .map((intern, index) => {
                    return <Intern intern={intern} key={index} />;
                  })}
              </div>
            );
          default:
            break;
        }
      }
      return (
        <div className="interns interns-active">
          {interns
            .filter((intern) => intern.verification.isVerified)
            .map((intern, index) => {
              return <Intern intern={intern} key={index} />;
            })}
        </div>
      );
    }
  };

  const handleSubmitSearchIntern = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleSearchIntern = useCallback((value) => {
    setSearchIntern(value);
  }, []);

  const handleFilter = useCallback(
    (e) => {
      e.stopPropagation();
      setIsFilterOpen(!isFilterOpen);
      setIsSortOpen(false);
    },
    [isFilterOpen]
  );

  const handleSort = useCallback(
    (e) => {
      e.stopPropagation();
      setIsSortOpen(!isSortOpen);
      setIsFilterOpen(false);
    },
    [isSortOpen]
  );

  const handleResetFocus = () => {
    setIsFilterOpen(false);
    setIsSortOpen(false);
  };

  useEffect(() => {
    dispatch(getAllInterns());
  }, []);

  return (
    <section className="intern-container" onClick={handleResetFocus}>
      <header>
        <h2>Interns</h2>
        <nav className="navigation">
          <div className="left-side">
            <button onClick={handleSort} className="sort-btn">
              Sort
            </button>
            <button onClick={handleFilter} className="filter-btn">
              Filter
            </button>
          </div>
          <div className="right-side">
            <form action="" onSubmit={handleSubmitSearchIntern}>
              <span>
                <BiSearchAlt />
              </span>
              <input
                placeholder="Search"
                type="text"
                onChange={(e) => handleSearchIntern(e.target.value)}
              />
            </form>
          </div>
        </nav>
        {isSortOpen && (
          <>
            <div className="overlay"></div>
            <div onClick={(e) => e.stopPropagation()} className="sort modal">
              <h3>Sort By</h3>
              <form>
                <div className="name-sort">
                  <label htmlFor="name-ascending">
                    <input
                      type="radio"
                      name="sort"
                      id="name-ascending"
                      value="name-ascending"
                      onChange={(e) => setSortValue(e.target.value)}
                    />
                    Name A-Z
                  </label>
                  <label htmlFor="name-descending">
                    <input
                      type="radio"
                      name="sort"
                      id="name-descending"
                      value="name-descending"
                      onChange={(e) => setSortValue(e.target.value)}
                    />
                    Name Z-A
                  </label>
                </div>
                <div className="time-sort">
                  <label htmlFor="time-ascending">
                    <input
                      type="radio"
                      name="sort"
                      id="time-ascending"
                      value="time-ascending"
                      onChange={(e) => setSortValue(e.target.value)}
                    />
                    Least Rendered Hours
                  </label>

                  <label htmlFor="time-descending">
                    <input
                      type="radio"
                      name="sort"
                      id="time-descending"
                      value="time-descending"
                      onChange={(e) => setSortValue(e.target.value)}
                    />
                    Most Rendered Hours
                  </label>
                </div>
              </form>
              <div className="btn-close">
                <button onClick={handleResetFocus}>Close</button>
              </div>
            </div>
          </>
        )}
        {isFilterOpen && (
          <>
            <div className="overlay"></div>
            <div onClick={(e) => e.stopPropagation()} className="filter modal">
              <h3>Filter</h3>
              <form></form>
              <div className="btn-close">
                <button onClick={handleResetFocus}>Close</button>
              </div>
            </div>
          </>
        )}
      </header>
      {renderInterns()}
      {isInternOpen && (
        <>
          <div
            onClick={() => dispatch(handleInternModal())}
            className="overlay"
          ></div>
          <div className="preview-container modal">
            <SelectedIntern />
            <div className="btn-close">
              <button onClick={() => dispatch(handleInternModal())}>
                Close
              </button>
              <button
                onClick={() =>
                  navigate(`/dashboard/interns/${selectedIntern.email}`)
                }
              >
                View More
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
});

export default Interns;
