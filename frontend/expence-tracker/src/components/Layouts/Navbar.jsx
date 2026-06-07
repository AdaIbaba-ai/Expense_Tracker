import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideBar from "./SideBar.jsx";
import "./Navbar.css";

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className="navbar">
            <button
                className="navbar-toggle hide-on-large"
                onClick={() => setOpenSideMenu(!openSideMenu)}
            >
                {openSideMenu ? (
                    <HiOutlineX className="navbar-icon" />
                ) : (
                    <HiOutlineMenu className="navbar-icon" />
                )}
            </button>

            <h2 className="navbar-title">Expense Tracker</h2>

            {openSideMenu && (
                <div className="side-menu-overlay">
                    <SideBar activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
