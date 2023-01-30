import React from "react";
import {IconContext} from "react-icons";
import {IoIosNotifications} from "react-icons/io";
import {TbMessageCircle} from "react-icons/tb";
import {FaChevronDown, FaInfoCircle} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {
  handleProfile,
  handleChat,
  handleNotification,
} from "../../features/dashboard/sidebarRight";
import ProfileTab from "../sidebarRight/ProfileTab";
import ChatTab from "../sidebarRight/ChatTab";
import NotificationTab from "../sidebarRight/NotificationTab";

const SideBarRight = () => {
  const {isProfileOpen, isChatOpen, isNotificationOpen} = useSelector(
    (state) => state.sidebarRight
  );
  const {
    user: {
      user: {profileImage},
    },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <IconContext.Provider value={{className: "icon"}}>
      <aside className="sidebar-right">
        <div className="top">
          {isProfileOpen && <ProfileTab />}
          {/* {isNotificationOpen && <NotificationTab />} */}
          {/* {isChatOpen && <ChatTab />} */}
          <span className="profile-img">
            <img
              onClick={() => dispatch(handleProfile())}
              src={profileImage}
              alt="user-profile"
            />
            <span onClick={() => dispatch(handleProfile())}>
              <FaChevronDown />
            </span>
          </span>
          {/* <span
            onClick={() => dispatch(handleNotification())}
            className="notification"
          >
            <IoIosNotifications />
          </span>
          <span onClick={() => dispatch(handleChat())} className="chat">
            <TbMessageCircle />
          </span> */}
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
