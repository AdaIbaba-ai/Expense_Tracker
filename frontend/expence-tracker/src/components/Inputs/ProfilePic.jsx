import React, { useRef, useState } from "react";
import { RiUser3Line, RiDeleteBinLine } from "react-icons/ri";
import { FiCamera } from "react-icons/fi";
import "./ProfilePic.css";

const ProfilePic = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
      <div className="photo-wrapper">
        <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden-input"
        />

        {!image ? (
            <div className="photo-placeholder">
              <RiUser3Line className="user-icon" />
              <button type="button" className="upload-btn" onClick={onChooseFile}>
                <FiCamera className="icon" />
              </button>
            </div>
        ) : (
            <div className="photo-preview">
              <img src={previewUrl} alt="profile" className="photo-image" />
              <button type="button" className="remove-btn" onClick={handleRemoveImage}>
                <RiDeleteBinLine className="icon" />
              </button>
            </div>
        )}
      </div>
  );
};

export default ProfilePic;
