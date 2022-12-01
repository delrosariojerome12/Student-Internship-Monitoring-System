import React from "react";
import {Link} from "react-router-dom";
import {RiDashboardLine} from "react-icons/ri";
import {HiPencilAlt} from "react-icons/hi";
import {HiDocument, HiTrendingUp} from "react-icons/hi";
import {
  FaUserAlt,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
  FaUserCheck,
} from "react-icons/fa";
import {MdOutlineWork} from "react-icons/md";
import {IconContext} from "react-icons";
import logo from "../../assets/img/logo.svg";
import {useSelector, useDispatch} from "react-redux";
import {handleSidebar} from "../../features/dashboard/dashboard";

const links = [
  {
    role: "intern",
    sidebar: [
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
    ],
  },
  {
    role: "admin",
    sidebar: [
      {
        path: "/dashboard",
        link: "Dashboard",
        IconType: RiDashboardLine,
      },
    ],
  },
  {
    role: "coordinator",
    sidebar: [
      {
        path: "/dashboard",
        link: "Dashboard",
        IconType: RiDashboardLine,
      },
      {
        path: "/dashboard/interns",
        link: "Interns",
        IconType: FaUsers,
      },
      {
        path: "/dashboard/approvals",
        link: "Appravals",
        IconType: FaUserCheck,
      },
      {
        path: "/dashboard/documents",
        link: "Documents",
        IconType: HiDocument,
      },
      {
        path: "/dashboard/internships",
        link: "Internships",
        IconType: MdOutlineWork,
      },
    ],
  },
];

const SidebarLeft = () => {
  const {isSidebarOpen} = useSelector((state) => state.dashboard);
  const {user} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const renderLinks = () => {
    if (user.user.role === "admin") {
      return links[1].sidebar.map((item, index) => {
        const {path, link, IconType} = item;
        return (
          <span className="icon-con" key={index}>
            <Link to={path}>
              <IconType />
              {isSidebarOpen && link}
            </Link>
          </span>
        );
      });
    }

    if (user.user.role === "coordinator") {
      return links[2].sidebar.map((item, index) => {
        const {path, link, IconType} = item;
        return (
          <span className="icon-con" key={index}>
            <Link to={path}>
              <IconType />
              {isSidebarOpen && link}
            </Link>
          </span>
        );
      });
    }

    const isVerified = user.verification.isVerified;
    if (isVerified) {
      return links[0].sidebar.map((item, index) => {
        const {path, link, IconType} = item;
        return (
          <span className="icon-con" key={index}>
            <Link to={path}>
              <IconType />
              {isSidebarOpen && link}
            </Link>
          </span>
        );
      });
    }
    return links[0].sidebar
      .filter((item) => item.link === "Dashboard" || item.link === "Profile")
      .map((item, index) => {
        const {path, link, IconType} = item;
        return (
          <span className="icon-con" key={index}>
            <Link to={path}>
              <IconType />
              {isSidebarOpen && link}
            </Link>
          </span>
        );
      });
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
          <span
            onClick={() => dispatch(handleSidebar())}
            onBlur={() => dispatch(handleSidebar())}
            className="collapse-icon"
          >
            {!isSidebarOpen ? <FaChevronRight /> : <FaChevronLeft />}
          </span>
        </div>
        <div className="links-con">{renderLinks()}</div>
      </IconContext.Provider>
    </aside>
  );
};

export default SidebarLeft;
