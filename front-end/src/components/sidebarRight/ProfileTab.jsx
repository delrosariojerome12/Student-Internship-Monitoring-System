import React from "react";
import {MdNightlight} from "react-icons/md";
import {VscFeedback} from "react-icons/vsc";
import {MdLogout} from "react-icons/md";
import {FaChevronRight} from "react-icons/fa";
import {IconContext} from "react-icons";

const ProfileTab = () => {
  return (
    <IconContext.Provider value={{className: "icon"}}>
      <div className="profile-tab tab">
        <div className="user">
          <img src={"https://i.imgur.com/aFPFvGv.jpg"} alt="" />
          <p>Bochi the Rock</p>
        </div>
        <div className="dark-mode">
          <div className="icon-holder">
            <MdNightlight />
            <p>Dark Mode</p>
          </div>
          <FaChevronRight />
        </div>
        <div className="feedback">
          <div className="icon-holder">
            <VscFeedback />
            <p>Feed back</p>
          </div>
          <FaChevronRight />
        </div>
        <div className="logout">
          <div className="icon-holder">
            <MdLogout />
            <p>Log out</p>
          </div>
          <FaChevronRight />
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default ProfileTab;
