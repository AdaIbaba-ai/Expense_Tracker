import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children, title, type = "default" }) => {
  if (!isOpen) return null;

  return (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className={`modal-box modal-box-${type}`}>
            <div className={`modal-header modal-header-${type}`}>
              <h3>{title}</h3>
              <button className={`modal-close-btn modal-close-${type}`} onClick={onClose}>
                &times;
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
  );
};

export default Modal;
