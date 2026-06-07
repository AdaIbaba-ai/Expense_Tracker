import React, { useContext } from "react";
import Navbar from "./Navbar.jsx";
import SideBar from "./SideBar.jsx";
import { UserContext } from "../../context/UserContext.jsx";

const Layout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideBar activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Layout;
