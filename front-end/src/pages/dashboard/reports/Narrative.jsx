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
        {/* <div className="right"></div>
        <div className="mid"></div>
        <div className="left"></div> */}
        <div className="blank">
          <h5>1</h5>
        </div>
        <div className="blank">
          <h5>2</h5>
        </div>
        <div className="blank">
          <h5>3</h5>
        </div>
        <div className="blank">
          <h5>4</h5>
        </div>
        <div className="blank">
          <h5>5</h5>
        </div>
        <div className="blank">
          <h5>6</h5>
        </div>
        <div className="blank">
          <h5>7</h5>
        </div>
        <div className="blank">
          <h5>8</h5>
        </div>
        <div className="blank">
          <h5>9</h5>
        </div>
      </div>
    </div>
  );
};

export default Narrative;
