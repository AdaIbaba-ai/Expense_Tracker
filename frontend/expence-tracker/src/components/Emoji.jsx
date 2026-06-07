import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";
import "./Emoji.css";

const Emoji = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="emoji-picker-container">
            <div className="emoji-icon-selector" onClick={() => setIsOpen(true)}>
                <div className="emoji-preview">
                    {icon ? (
                        <img src={icon} alt="Icon" className="emoji-preview-image" />
                    ) : (
                        <LuImage />
                    )}
                </div>
                <p className="emoji-label">{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>

            {isOpen && (
                <div className="emoji-popup-wrapper">
                    <button className="emoji-close-button" onClick={() => setIsOpen(false)}>
                        <LuX />
                    </button>
                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
                    />
                </div>
            )}
        </div>
    );
};

export default Emoji;
