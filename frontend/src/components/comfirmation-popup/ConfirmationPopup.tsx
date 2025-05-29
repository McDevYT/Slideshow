import React from "react";
import "./ConfirmationPopup.css";
import Popup from "../popup/Popup";

interface ComfirmationPopupProps {
  isVisible: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;

  title: string;
  message: string;
}

const ComfirmationPopup: React.FC<ComfirmationPopupProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  title,
  message,
}) => {
  if (!isVisible) return null;

  return (
    <Popup isVisible onClose={onCancel}>
      <div>
        <div>
          <h1 className="confirmationPopupTitle">{title}</h1>
          <p className="confirmationPopupParagraph">{message}</p>
        </div>
        <div className="confirmationPopupButtonDiv">
          <button className="confirmationPopupButton" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirmationPopupButton" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default ComfirmationPopup;
