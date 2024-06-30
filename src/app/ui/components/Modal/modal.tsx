import React from "react";
import MuiModal from "@mui/material/Modal";
import "./style.css";

export type ModalProps = React.PropsWithChildren & {
  open: boolean;
  onClose: () => void;
  smallScreen?: boolean;
  noBackground?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  children,
  open,
  onClose,
  smallScreen,
}) => {
  return (
    <MuiModal open={open} onClose={onClose} className="modal">
      <div
        className={`${smallScreen ? "!max-w-[600px] bg-gray-200" : ""} modal-container`}
      >
        <div className="modal-header">
          <button
            className="modal-close flex w-full justify-end px-2 text-black"
            onClick={onClose}
          >
            x
          </button>
        </div>
        {children}
      </div>
    </MuiModal>
  );
};

export default Modal;
