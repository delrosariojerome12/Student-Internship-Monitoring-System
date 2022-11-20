import React from "react";

const Narrative = () => {
  return (
    <div className="narrative-container">
      <div className="button-container">
        <button className="add">Add</button>
        <button className="edit">Edit</button>
        <button className="View">View</button>
      </div>
      <div className="content">
        <div className="right">
          <div className="blank">
            <h5>Day 1</h5>
            <p>August 18, 2022</p>
          </div>
          <div className="blank">
            <h5>Day 2</h5>
            <p>August 19, 2022</p>
          </div>
          <div className="blank">
            <h5>Day 3</h5>
            <p>August 20, 2022</p>
          </div>
          <div className="blank">
            <h5>Day 4</h5>
            <p>August 21, 2022</p>
          </div>
        </div>
        <div className="mid">
          <div className="blank">
            <div className="top">
              <button>complete</button>
            </div>
            <div className="bottom">
              <button className="add">Add</button>
              <button className="edit">Edit</button>
              <button className="View">View</button>
            </div>
          </div>
          <div className="blank">
            <div className="top">
              <button>complete</button>
            </div>
            <div className="bottom">
              <button className="add">Add</button>
              <button className="edit">Edit</button>
              <button className="View">View</button>
            </div>
          </div>
          <div className="blank">
            <div className="top">
              <button>complete</button>
            </div>
            <div className="bottom">
              <button className="add">Add</button>
              <button className="edit">Edit</button>
              <button className="View">View</button>
            </div>
          </div>
          <div className="blank">
            <div className="top">
              <button>complete</button>
            </div>
            <div className="bottom">
              <button className="add">Add</button>
              <button className="edit">Edit</button>
              <button className="View">View</button>
            </div>
          </div>
        </div>
        <div className="left">
          <div className="blank"></div>
          <div className="blank"></div>
          <div className="blank"></div>
          <div className="blank"></div>
        </div>
      </div>
    </div>
  );
};

export default Narrative;
