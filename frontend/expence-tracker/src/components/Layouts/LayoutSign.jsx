import React from "react";
import "./LayoutSing.css";

const LayoutSign = ({ children }) => {
    return (
        <div className="auth-page">
            {children}
        </div>
    );
};

export default LayoutSign;
