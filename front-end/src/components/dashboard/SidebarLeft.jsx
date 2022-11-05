import React from "react";
import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { HiPencilAlt } from "react-icons/hi";
import { HiDocument, HiTrendingUp } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IconContext } from "react-icons";

import logo from "../../assets/img/landingPage/Logo.png";

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
  return (
    <aside className="left-sidebar">
      <div className="img-con">
        <img src={logo} alt="Logo.png " />
      </div>
      <div className="links-con">
        <IconContext.Provider value={{ className: "icons", color: "white" }}>
          {links.map((item, index) => {
            const { path, link, IconType } = item;
            return (
              <Link to={path} key={index}>
                <IconType />
                {link}
              </Link>
            );
          })}
        </IconContext.Provider>
      </div>
      <div className="box">
        <button type="submit">Log In</button>
      </div>
    </aside>
  );
};

export default SidebarLeft;
