import React, {useState, useEffect} from "react";
import {BiSearchAlt} from "react-icons/bi";
import {TbArrowsSort} from "react-icons/tb";
import {MdFilterList} from "react-icons/md";
import {FaArrowRight, FaArrowUp} from "react-icons/fa";
import pic from "../../assets/img/bg.png";
import {useSelector, useDispatch} from "react-redux";

const Internships = () => {
  useEffect(() => {}, []);

const Internships = React.memo(() => {
  const dispatch = useDispatch();

  const {internships, isLoading, isError, isViewOpen, selectedInternship} =
    useSelector((state) => state.internship);

  const [isSortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState(null);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isFilterValue, setFilterValue] = useState(null);

  useEffect(() => {
    dispatch(getAllInternship());
  }, []);

  if (!internships) {
    return <Bouncing />;
  }
  if (isLoading) {
    return <Bouncing />;
  }
  if (isError) {
    return <ServerError />;
  }

  const renderInternship = () => {
    if (internships.length > 0) {
      return (
        <div className="content">
          {internships.map((item, index) => (
            <Internship key={index} internship={item} />
          ))}
        </div>
      );
    }
    return (
      <div className="no-internship">
        <h3>No existing internships at the moment.</h3>
        <img src={NoDocumentSvg} alt="no-internship" />
      </div>
    );
  };
  return (
    <section className="internship-container-intern">
      <header>
        <h3>Looking for Internship?</h3>
      </header>
      <div className="btn-contoller">
        <button
          onClick={() => {
            setSortOpen(!isSortOpen);
          }}
          type="button"
        >
          Sort
        </button>
        <button
          onClick={() => {
            setFilterOpen(!isFilterOpen);
          }}
          type="button"
        >
          Filter
        </button>
      </div>
      {renderInternship()}
      {isViewOpen && <ViewModal form={form} />}
      {/* not working */}
      {isFilterOpen && (
        <>
          <div className="overlay" onClick={() => setFilterOpen(false)}></div>
          <div onClick={(e) => e.stopPropagation()} className="filter modal">
            <p>filter</p>
          </div>
        </>
      )}
      {isSortOpen && (
        <>
          <div className="overlay" onClick={() => setSortOpen(false)}></div>
          <div onClick={(e) => e.stopPropagation()} className="sort modal">
            <h4>Sort By</h4>
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
          </div>
        </>
      )}
    </section>
  );
};

export default Internships;
