import React from "react";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onClose,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <input
        className="modal-state"
        id="modal-1"
        type="checkbox"
        onClick={onClose}
      />
      <div className="modal">
        {/* <label className="modal-bg" for="modal-1"></label> */}
        <div className="modal-body">
          <label className="btn-close" htmlFor="modal-1">
            X
          </label>
          <h4 className="modal-title">{title}</h4>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};
