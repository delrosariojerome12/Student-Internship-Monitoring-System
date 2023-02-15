import React, {useEffect} from "react";
import Internship from "../../components/coordinator/Internship";
import {useSelector, useDispatch} from "react-redux";
import Bouncing from "../../components/loading/Bouncing";
import ServerError from "../serverError";
import {
  getAllInternship,
  handleEdit,
  handleView,
} from "../../features/coordinator/internship";
import {handleAdd} from "../../features/coordinator/internship";

const Internships = React.memo(() => {
  const {internships, isLoading, isError, isEditOpen, isViewOpen, isAddOpen} =
    useSelector((state) => state.internship);
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
        <button onClick={() => dispatch(handleAdd())}>Add</button>
      </div>
      <div className="content">{renderInternship()}</div>

      {isAddOpen && (
        <>
          <div onClick={() => dispatch(handleAdd())} className="overlay"></div>
          <div className="add-modal modal">
            <p>Add</p>
          </div>
        </>
      )}
      {isEditOpen && (
        <>
          <div onClick={() => dispatch(handleEdit())} className="overlay"></div>
          <div className="edit-modal modal">
            <p>Edit</p>
          </div>
        </>
      )}
      {isViewOpen && (
        <>
          <div onClick={() => dispatch(handleView())} className="overlay"></div>
          <div className="view-modal modal">
            <p>View</p>
          </div>
        </>
      )}
    </div>
  );
});

export default Internships;
