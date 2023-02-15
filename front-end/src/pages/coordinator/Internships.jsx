import React, {useEffect} from "react";
import Internship from "../../components/coordinator/Internship";
import {useSelector, useDispatch} from "react-redux";
import Bouncing from "../../components/loading/Bouncing";
import ServerError from "../serverError";
import {getAllInternship} from "../../features/coordinator/internship";

const Internships = React.memo(() => {
  const {internships, isLoading, isError} = useSelector(
    (state) => state.internship
  );
  const dispatch = useDispatch();

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
    return internships.map((item, index) => (
      <Internship key={index} internship={item} />
    ));
  };
  return (
    <div className="internship-container">
      <header>
        <h2>Internships</h2>
      </header>
      <div className="btn-container">
        <button>Add</button>
      </div>
      <div className="content">{renderInternship()}</div>
    </div>
  );
});

export default Internships;
