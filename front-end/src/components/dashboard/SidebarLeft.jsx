import React from "react";
import {Link} from "react-router-dom";
import {RiDashboardLine} from "react-icons/ri";
import {HiPencilAlt} from "react-icons/hi";
import {HiDocument, HiTrendingUp} from "react-icons/hi";
import {FaUserAlt, FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {IconContext} from "react-icons";
import logo from "../../assets/img/logo.svg";
import {useSelector, useDispatch} from "react-redux";
import {handleSidebar} from "../../features/dashboard/dashboard";

const links = [
  {
    path: "/dashboard",
    link: "Dashboard",
    IconType: RiDashboardLine,
  },
  {
    path: "/dashboard/profile/summary",
    link: "Profile",
    IconType: FaUserAlt,
  },
  {
    path: "/dashboard/daily-time-record",
    link: "DTR",
    IconType: HiTrendingUp,
  },
  {
    path: "/dashboard/documents/requirments",
    link: "Documents",
    IconType: HiDocument,
  },
  {
    path: "/dashboard/reports/narrative",
    link: "Reports",
    IconType: HiPencilAlt,
  },
];

const SidebarLeft = () => {
  const {isSidebarOpen} = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  return (
    <aside
      className={
        isSidebarOpen ? "left-sidebar active-sidebar" : "left-sidebar "
      }
    >
      <IconContext.Provider value={{className: "icons", color: "white"}}>
        <div className="img-con">
          <img src={logo} alt="Logo.png " />
          <span
            onClick={() => dispatch(handleSidebar())}
            onBlur={() => dispatch(handleSidebar())}
            className="collapse-icon"
          >
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
