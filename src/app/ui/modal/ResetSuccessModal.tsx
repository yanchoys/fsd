import Modal, { type ModalProps } from "../components/Modal/modal";
import React from "react";

type Props = ModalProps;

// I am leaving  it here just in case we need a modal.
const ResetSuccessModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="mx-auto max-w-[583px]">
        <h2 className="mb-5 text-center text-title font-semibold">
          Password successfully sent
        </h2>
        <p className="mx-auto mb-[160px] max-w-[414px] text-center text-lg leading-6">
          New password has been sent successfuly by email. You can check your
          email and use it.
        </p>

        <div className="flex justify-center gap-5">
          <button className="max-w-[217px]" onClick={() => onClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ResetSuccessModal;
