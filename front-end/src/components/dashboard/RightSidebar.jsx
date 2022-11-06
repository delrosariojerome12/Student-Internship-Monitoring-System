import React, {useState} from "react";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {IconContext} from "react-icons";

const RightSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSideBar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <IconContext.Provider value={{className: "icon"}}>
      <aside
        className={
          isSidebarOpen ? "right-sidebar active-sidebar" : "right-sidebar"
        }
      >
        <div className="top">
          <div className="chat">
            <h1>message</h1>
          </div>
          <div className="profile">
            <h1>profile</h1>
          </div>
        </div>
        <div className="graph">
          <h1>Graph</h1>
          <span className="collapse-icon">
            {isSidebarOpen ? (
              <FaChevronRight onClick={handleSideBar} />
            ) : (
              <FaChevronLeft onClick={handleSideBar} />
            )}
          </span>
        </div>
        <div className="graph2">
          <h1>Graph 2</h1>
        </div>
      </aside>
    </IconContext.Provider>
  );
};

export default RightSidebar;
