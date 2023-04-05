/** @format */

import React, {useState, useEffect} from "react";

import {useSelector, useDispatch} from "react-redux";
import {getAllInternship} from "../../features/coordinator/internship";
import ViewModal from "../../components/coordinator/ViewModal";
import Internship from "../../components/coordinator/Internship";
import Bouncing from "../../components/loading/Bouncing";
import ServerError from "../serverError";
import NoDocumentSvg from "../../assets/img/waiting.svg";

const form = [
  {
    type: "text",
    id: "company-name",
    forInput: "Company Name",
    value: "",
    isError: false,
    errorMessage: "Atleast 2 characters and max of 75",
    isDisabled: false,
    code: "companyName",
  },
  {
    type: "text",
    id: "company-address",
    code: "companyAddress",
    forInput: "Company Address",
    value: "",
    isError: false,
    errorMessage: "Atleast 5 characters and max of 100",
    isDisabled: false,
  },
  {
    type: "text",
    id: "supervisor",
    code: "supervisor",
    forInput: "Supervisor",
    value: "",
    isError: false,
    errorMessage: "Atleast 2 characters and  max of 50",
    isDisabled: false,
  },
  {
    type: "text",
    id: "supervisor-contact",
    code: "supervisorContact",
    forInput: "Supervisor Contact",
    value: "",
    isError: false,
    errorMessage: "This phone number format is not recognized.",
    isDisabled: false,
  },
  {
    type: "email",
    id: "email",
    code: "email",
    forInput: "Email",
    value: "",
    isError: false,
    errorMessage: "Please provide valid email.",
    isDisabled: false,
  },
  {
    type: "list",
    id: "duties",
    forInput: "Duties",
    value: "",
    isDisabled: false,
    code: "typeOfWork",
    valuePlaceholder: {
      value: "Duties",
      label: "Duties",
    },
    optionItems: [
      {
        value: "Encoding",
        label: "Encoding",
      },
      {
        value: "Paper Works",
        label: "Paper Works",
      },
      {
        value: "Sofware Development",
        label: "Sofware Development",
      },
      {
        value: "Hardware Related",
        label: "Hardware Related",
      },
      {
        value: "Not specified",
        label: "Not specified",
      },
    ],
  },
  {
    type: "image",
    id: "logo",
    code: "logo",
    forInput: "Logo",
    value: "",
    isError: false,
    errorMessage: "",
    isDisabled: false,
    name: "",
    link: "",
  },
  {
    type: "textArea",
    id: "description",
    forInput: "Description",
    value: "",
    isError: false,
    errorMessage: "Atleast 20 characters and max of 100",
    isDisabled: false,
    code: "description",
    minLength: 20,
    maxLength: 100,
  },
];

const Internships = React.memo(() => {
  const dispatch = useDispatch();

  const {internships, isLoading, isError, isViewOpen, selectedInternship} =
    useSelector((state) => state.internship);

  const {
    user: {verification},
  } = useSelector((state) => state.user);

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
        <h3>
          No existing <b>internships</b> at the moment.
        </h3>
        <img src={NoDocumentSvg} alt="no-internship" />
      </div>
    );
  };
  return (
    <section className="internship-container-intern">
      <header>
        <div className="page-title">
          <h2>Looking for Internship?</h2>
        </div>
        <div className="btn-contoller">
          {/* <button
          onClick={() => {
            setSortOpen(!isSortOpen);
          }}
          type="button"
        >
          Sort
        </button> */}
          <button
            onClick={() => {
              setFilterOpen(!isFilterOpen);
            }}
            type="button"
          >
            Filter
          </button>
        </div>
      </header>
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
            <h3>Sort by</h3>
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
                  <b>Name A-Z</b>
                </label>
                <label htmlFor="name-descending">
                  <input
                    type="radio"
                    name="sort"
                    id="name-descending"
                    value="name-descending"
                    onChange={(e) => setSortValue(e.target.value)}
                  />
                  <b>Name Z-A</b>
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
                  <b>Least Rendered Hours</b>
                </label>
                <label htmlFor="time-descending">
                  <input
                    type="radio"
                    name="sort"
                    id="time-descending"
                    value="time-descending"
                    onChange={(e) => setSortValue(e.target.value)}
                  />
                  <b>Most Rendered Hours</b>
                </label>
              </div>
            </form>
          </div>
        </>
      )}
    </section>
  );
});

export default Internships;
