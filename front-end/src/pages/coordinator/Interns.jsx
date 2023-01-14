import React, { useState, useCallback, useEffect } from "react";
import Intern from "../../components/coordinator/Intern";
import { useSelector, useDispatch } from "react-redux";
import internWaiting from "../../assets/img/waiting.svg";

const Interns = () => {
  const { interns, isError } = useSelector((state) => state.intern);
  const [searchIntern, setSearchIntern] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const renderInterns = () => {
    if (!interns) {
      return <h1>Loading...</h1>;
    }
    if (interns.length === 0) {
      return (
        <section className="interns ">
          <div className="no-entries">
            <h3>
              Oops, there were no <b>interns</b> yet come back again later
            </h3>
            <div className="img-waiting">
              <img src={internWaiting} alt="Approvals waiting image" />
            </div>
          </div>
        </section>
      );
    }
    return interns.map((intern, index) => {
      return <Intern intern={intern} key={index} />;
    });
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

  return (
    <section className="intern-container" onClick={handleResetFocus}>
      <div className="preview-container"></div>
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
            <input
              placeholder="Search"
              type="text"
              onChange={(e) => handleSearchIntern(e.target.value)}
            />
          </form>
        </div>
      </nav>
      <div className="interns">
        {isSortOpen && (
          <div onClick={(e) => e.stopPropagation()} className="sort modal">
            <p>sort</p>
          </div>
        )}
        {isFilterOpen && (
          <div onClick={(e) => e.stopPropagation()} className="filter modal">
            <p>filter</p>
          </div>
        )}
        {renderInterns()}
      </div>
    </section>
  );
};

export default Interns;
