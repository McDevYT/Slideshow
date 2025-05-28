import React from "react";
import "./Popup.css";

interface PopupProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose?: () => void;
}

const Popup: React.FC<PopupProps> = ({ children, isVisible, onClose }) => {
  if (!isVisible) return null;
  return (
    <div id="popupOverlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Popup;
