import React from "react";
import { getInitials } from "../../utils/helper.js";
import "./Cards.css";

const CharacterAvatar = ({ fullName, width, height, style }) => {
  return (
      <div
          className={`char-avatar ${width || "default-width"} ${height || "default-height"} ${style || ""}`}
      >
        {getInitials(fullName || "")}
      </div>
  );
};

export default CharacterAvatar;
