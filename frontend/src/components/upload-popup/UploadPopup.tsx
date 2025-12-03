import React, { useState } from "react";
import Popup from "../popup/Popup";
import "./UploadPopup.css";
import useUploadPopupViewModel from "../../viewmodels/UploadPopupViewModel";

interface PopupProps {
  isVisible: boolean;
  onClose?: () => void;
}

const UploadPopup: React.FC<PopupProps> = ({ isVisible, onClose }) => {
  const { uploadImage } = useUploadPopupViewModel();

  const [file, setFile] = useState<File | undefined>(undefined);

  const handleClick = async () => {
    if (!file) return;
    uploadImage(file);
    setFile(undefined);
    if (onClose) onClose();
  };

  if (!isVisible) return null;
  return (
    <Popup onClose={onClose} isVisible>
      <div className="uploadPopup">
        <label htmlFor="file-upload" className="custom-file-upload">
          Click to upload an image or video
        </label>
        <input
          accept="image/*,video/mp4"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
          id="file-upload"
          type="file"
        />
        <button onClick={handleClick}>Upload</button>
      </div>
    </Popup>
  );
};

export default UploadPopup;
