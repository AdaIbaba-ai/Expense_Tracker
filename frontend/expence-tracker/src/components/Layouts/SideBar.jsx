import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";
import CharacterAvatar from "../Cards/CharacterAvatar.jsx";
import "./SideBar.css"; // <--- Neue CSS-Datei einbinden

const SideBar = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handelLogout();
      return;
    }
    navigate(route);
  };

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
      <div className="side-menu">
        <div className="side-menu-profile">
          {user?.profileImageUrl ? (
              <img
                  src={user?.profileImageUrl || ""}
                  alt="Profile"
                  className="side-menu-image"
              />
          ) : (
              <CharacterAvatar
                  fullName={user.fullname}
                  width="avatar-width"
                  height="avatar-height"
                  style="avatar-text"
              />
          )}

          <h5 className="side-menu-name">{user.fullName || ""}</h5>
        </div>

        {SIDE_MENU_DATA.map((item, index) => (
            <button
                key={`menu_${index}`}
                className={`side-menu-item ${
                    activeMenu === item.label ? "active" : ""
                }`}
                onClick={() => handleClick(item.path)}
            >
              <item.icon className="side-menu-icon" />
              {item.label}
            </button>
        ))}
      </div>
  );
};

export default SideBar;
