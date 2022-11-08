import React from "react";
import {IconContext} from "react-icons";
import {IoIosNotifications, IoMdSettings} from "react-icons/io";
import {TbMessageCircle} from "react-icons/tb";
import {FaChevronDown, FaInfoCircle} from "react-icons/fa";
import {VscFeedback} from "react-icons/vsc";

const SideBarRight = () => {
  return (
    <IconContext.Provider value={{className: "icon"}}>
      <aside className="sidebar-right">
        <div className="top">
          <span className="profile-img">
            <img src={"https://i.imgur.com/aFPFvGv.jpg"} alt="" />
            <span>
              <FaChevronDown />
            </span>
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
          <span>
            <IoMdSettings />
          </span>
          <span>
            <VscFeedback />
          </span>
        </div>
      </aside>
    </IconContext.Provider>
  );
};

export default SideBarRight;
