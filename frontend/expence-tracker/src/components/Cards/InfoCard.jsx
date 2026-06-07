import React from "react";
import "./Cards.css";

const InfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="info-card">
            <div className={`info-icon ${color}`}>
                {icon}
            </div>
            <div>
                <h6 className="info-label">{label}</h6>
                <span className="info-value">CHF {value}</span>
            </div>
        </div>
    );
};

export default InfoCard;
