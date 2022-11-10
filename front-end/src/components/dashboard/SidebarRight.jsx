import React from "react";
import {IconContext} from "react-icons";
import {IoIosNotifications, IoMdSettings} from "react-icons/io";
import {TbMessageCircle} from "react-icons/tb";
import {FaChevronDown, FaInfoCircle} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {handleProfile} from "../../features/dashboard/sidebarRight";
import ProfileTab from "../sidebarRight/ProfileTab";

const SideBarRight = () => {
  const {isProfileOpen} = useSelector((state) => state.sidebarRight);
  const dispatch = useDispatch();

  return (
    <IconContext.Provider value={{className: "icon"}}>
      <aside className="sidebar-right">
        <div className="top">
          <span className="profile-img">
            <img
              onClick={() => dispatch(handleProfile())}
              src={"https://i.imgur.com/aFPFvGv.jpg"}
              alt=""
            />
            <span onClick={() => dispatch(handleProfile())}>
              <FaChevronDown />
            </span>
            {isProfileOpen && <ProfileTab />}
          </span>
          <span className="notification">
            <IoIosNotifications />
          </span>
          <span className="message">
            <TbMessageCircle />
          </span>
        </div>
        <div className="bottom">
          <span className="info">
            <FaInfoCircle />
          </span>
        </div>
      </aside>
    </IconContext.Provider>
  );
};

export default SideBarRight;
