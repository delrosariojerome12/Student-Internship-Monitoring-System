import React, {useState, useCallback, useEffect} from "react";
import Intern from "../../components/coordinator/Intern";
import {useSelector, useDispatch} from "react-redux";
import internWaiting from "../../assets/img/waiting.svg";
import {getAllInterns} from "../../features/interns/internReducer";

import {BiSearchAlt} from "react-icons/bi";
import Bouncing from "../../components/loading/Bouncing";

const Interns = () => {
  const {interns, isError} = useSelector((state) => state.intern);
  const [searchIntern, setSearchIntern] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dispatch = useDispatch();

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
              There are no <b>interns</b> curently in the sytem
            </h3>
            <div className="img-waiting">
              <img src={internWaiting} alt="approval" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="interns interns-active">
          {interns
            .filter((intern) => intern.verification.isVerified)
            .map((intern, index) => {
              return <Intern intern={intern} key={index} />;
            })}
          {isSortOpen && (
            <>
              <div className="overlay"></div>
              <div onClick={(e) => e.stopPropagation()} className="sort modal">
                <p>sort</p>
              </div>
            </>
          )}
          {isFilterOpen && (
            <>
              <div className="overlay"></div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="filter modal"
              >
                <p>filter</p>
              </div>
            </>
          )}
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
      {renderInterns()}
    </section>
  );
};

export default Interns;
