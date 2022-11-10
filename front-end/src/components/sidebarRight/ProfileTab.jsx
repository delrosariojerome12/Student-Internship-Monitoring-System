import React from "react";
import {MdNightlight} from "react-icons/md";
import {VscFeedback} from "react-icons/vsc";
import {MdLogout} from "react-icons/md";
import {FaChevronRight} from "react-icons/fa";

const ProfileTab = () => {
  return (
    <div className="profile-tab">
      <div className="user">
        <img src={"https://i.imgur.com/aFPFvGv.jpg"} alt="" />
        <p>Bochi the Rock</p>
      </div>
      <div className="dark-mode">
        <MdNightlight />
        <p>Dark Mode</p>
      </div>
      <div className="feedback">
        <VscFeedback />
        <p>Feed back</p>
      </div>
      <div className="logout">
        <MdLogout />
        <p>Log out</p>
      </div>
    </div>
  );
};

export default ProfileTab;
