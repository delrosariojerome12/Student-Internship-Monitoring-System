import React, {useState} from "react";
import {Link} from "react-router-dom";
import {RiDashboardLine} from "react-icons/ri";
import {HiPencilAlt} from "react-icons/hi";
import {HiDocument, HiTrendingUp} from "react-icons/hi";
import {FaUserAlt, FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {IoMdSettings, IoMdSearch} from "react-icons/io";
import {IconContext} from "react-icons";

import graph from "../../assets/img/graph.png";
import logo from "../../assets/img/logo.svg";

const links = [
  {
    path: "/dashboard",
    link: "Dashboard",
    IconType: RiDashboardLine,
  },
  {
    path: "/dashboard/profile",
    link: "Profile",
    IconType: FaUserAlt,
  },
  {
    path: "/dashboard/daily-time-record",
    link: "DTR",
    IconType: HiTrendingUp,
  },
  {
    path: "/dashboard/documents",
    link: "Documents",
    IconType: HiDocument,
  },
  {
    path: "/dashboard/reports",
    link: "Reports",
    IconType: HiPencilAlt,
  },
  // {
  //   path: "/dashboard/settings",
  //   link: "Settings",
  //   IconType: IoMdSettings,
  // },
  ,
];

const SidebarLeft = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleSideBar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <aside
      className={
        isSidebarOpen ? "left-sidebar active-sidebar" : "left-sidebar "
      }
    >
      <IconContext.Provider value={{className: "icons", color: "white"}}>
        <div className="img-con">
          <img src={logo} alt="Logo.png " />
          <span onClick={handleSideBar} className="collapse-icon">
            {!isSidebarOpen ? <FaChevronRight /> : <FaChevronLeft />}
          </span>
        </div>
        <div className="links-con">
          {links.map((item, index) => {
            const {path, link, IconType} = item;
            return (
              <span className="icon-con" key={index}>
                <Link to={path}>
                  <IconType />
                  {isSidebarOpen && link}
                </Link>
              </span>
            );
          })}
        </div>
      </IconContext.Provider>
    </aside>
  );
};

export default SidebarLeft;
