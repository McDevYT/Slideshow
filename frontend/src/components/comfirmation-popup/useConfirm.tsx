// useConfirm.tsx
import { useState, useCallback } from "react";
import ConfirmationPopup from "./ConfirmationPopup";

export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState({
    title: "",
    message: "",
    resolve: (_value: boolean) => {},
  });

  const confirm = useCallback((title: string, message: string) => {
    return new Promise<boolean>((resolve) => {
      setOptions({ title, message, resolve });
      setIsOpen(true);
    });
  }, []);

  const handleConfirm = () => {
    setIsOpen(false);
    options.resolve(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    options.resolve(false);
  };

  const Confirm = (
    <ConfirmationPopup
      isVisible={isOpen}
      title={options.title}
      message={options.message}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  return { confirm, Confirm };
};
