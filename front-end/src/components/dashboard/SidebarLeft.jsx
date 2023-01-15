import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {RiDashboardLine} from "react-icons/ri";
import {HiPencilAlt} from "react-icons/hi";
import {HiDocument, HiTrendingUp, HiMenu, HiMenuAlt3} from "react-icons/hi";
import {
  FaUserAlt,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
  FaUserCheck,
} from "react-icons/fa";
import {MdOutlineWork, MdLogout} from "react-icons/md";
import {IconContext} from "react-icons";
import logo from "../../assets/img/logo.svg";
import {useSelector, useDispatch} from "react-redux";
import {handleSidebar} from "../../features/dashboard/dashboard";
import CrossSvg from "../../assets/img/cross.svg";
import {FaRegBuilding} from "react-icons/fa";
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
      {
        path: "/dashboard/internships",
        link: "Internships",
        IconType: FaRegBuilding,
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
      {
        path: "/dashboard/documents",
        link: "Documents",
        IconType: HiDocument,
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
        link: "Approvals",
        IconType: FaUserCheck,
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
  const {
    user: {email, firstName, lastName, profileImage, role},
  } = user;

  const dispatch = useDispatch();

  const [isDropDownOpen, setDropDownOpen] = useState(false);

  const renderLinks = () => {
    if (user.user.role === "admin") {
      return links[1].sidebar.map((item, index) => {
        const {path, link, IconType} = item;
        return (
          <span className="icon-con" key={index}>
            <Link to={path}>
              <IconType />
              {/* {isSidebarOpen && link} */}
              {isSidebarOpen ? link : isDropDownOpen ? link : null}
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
              {/* {isSidebarOpen && link} */}
              {isSidebarOpen ? link : isDropDownOpen ? link : null}
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
              {/* {isSidebarOpen && link} */}
              {isSidebarOpen ? link : isDropDownOpen ? link : null}
            </Link>
          </span>
        );
      });
    }
    return links[0].sidebar
      .filter((item) => item.link === "Dashboard")
      .map((item, index) => {
        const {path, link, IconType} = item;
        return (
          <span className="icon-con" key={index}>
            <Link to={path}>
              <IconType />
              {isSidebarOpen ? link : isDropDownOpen ? link : null}
              {/* {isDropDownOpen && link} */}
            </Link>
          </span>
        );
      });
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setDropDownOpen(false);
    });
  }, []);

  return (
    <aside
      className={
        isSidebarOpen ? "left-sidebar active-sidebar" : "left-sidebar "
      }
    >
      <IconContext.Provider value={{className: "icons"}}>
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
        {isDropDownOpen ? (
          <div className={isDropDownOpen ? "links-con active" : "links-con"}>
            <div className="sub-container">
              <div className="user">
                <img src={profileImage} alt="user" />
                <p>{email}</p>
                <p>{`${firstName} ${lastName}`}</p>
              </div>
              <div className="link-container">{renderLinks()}</div>
              <button>
                <MdLogout />
                <p>Logout</p>
              </button>
            </div>
          </div>
        ) : (
          <div className={isDropDownOpen ? "links-con active" : "links-con"}>
            {renderLinks()}
          </div>
        )}

        <button onClick={() => setDropDownOpen(!isDropDownOpen)}>
          {isDropDownOpen ? <img src={CrossSvg} alt="cross" /> : <HiMenu />}
        </button>
      </IconContext.Provider>
    </aside>
  );
};

export default SidebarLeft;
