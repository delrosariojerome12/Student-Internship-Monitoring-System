import React, {useState} from "react";
import {Link} from "react-router-dom";
import {RiDashboardLine} from "react-icons/ri";
import {HiPencilAlt} from "react-icons/hi";
import {HiDocument, HiTrendingUp} from "react-icons/hi";
import {FaUserAlt, FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {IoMdSettings} from "react-icons/io";
import {IconContext} from "react-icons";

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
    link: "Daily Time Record",
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
  ,
  {
    path: "/dashboard/settings",
    link: "Settings",
    IconType: IoMdSettings,
  },
];

const SidebarLeft = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleSideBar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <aside className={isSidebarOpen ? "left-sidebar active" : "left-sidebar"}>
      <IconContext.Provider value={{className: "icons", color: "white"}}>
        <div className="img-con">
          <img src={logo} alt="Logo.png " />
        </div>
        <div className="links-con">
          <span onClick={handleSideBar} className="collapse-icon">
            {isSidebarOpen ? <FaChevronRight /> : <FaChevronLeft />}
          </span>
          {links.map((item, index) => {
            const {path, link, IconType} = item;
            return (
              <Link to={path} key={index}>
                <IconType />
                {!isSidebarOpen && link}
              </Link>
            );
          })}
        </div>
        <div className="box">
          <button type="submit">Log In</button>
        </div>
      </IconContext.Provider>
    </aside>
  );
};

export default SidebarLeft;
