import React from "react";

const Modal: React.FC<{
  children: React.ReactNode;
  title: string;
  isVisible: boolean;
  onClose: () => void;
}> = ({ children, title, isVisible, onClose }) => {
  if (isVisible) {
    return (isVisible && (
      <>
        <div className="modal-backdrop" onClick={onClose}></div>
        <div className="modal-wrapper">
          <div className="modal-header">
            <h3>{title}</h3>
            <button onClick={onClose}>X</button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </>)
    )
  }
  return null
};
export default Modal;
