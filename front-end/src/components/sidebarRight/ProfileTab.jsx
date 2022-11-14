import React from "react";
import {MdNightlight} from "react-icons/md";
import {VscFeedback} from "react-icons/vsc";
import {MdLogout} from "react-icons/md";
import {FaChevronRight} from "react-icons/fa";
import {IconContext} from "react-icons";
import {useDispatch, useSelector} from "react-redux";
import {handleLogout} from "../../features/user/userReducer";
import {useNavigate} from "react-router-dom";
const ProfileTab = () => {
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch("");
  const navigate = useNavigate();

  console.log(user);

  return (
    <IconContext.Provider value={{className: "icon"}}>
      <div className="profile-tab tab">
        <div className="user">
          <img src={"https://i.imgur.com/aFPFvGv.jpg"} alt="" />
          <p>{user.firstname}</p>
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
        <div
          onClick={() => {
            dispatch(handleLogout());
            navigate("/account/login");
          }}
          className="logout"
        >
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
