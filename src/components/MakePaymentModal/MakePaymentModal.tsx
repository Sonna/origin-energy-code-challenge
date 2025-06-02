import React, { useState } from "react";
import { createPortal } from "react-dom";

import { MakePaymentForm } from "./../MakePaymentForm/MakePaymentForm";
import { Text } from "./../../lib/PaperCss";

interface Props {
  accountId: string;
}

export const MakePaymentModal = ({ accountId }: Props) => {
  const modalId = `modal-${accountId}`;
  const [isOpen, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <label htmlFor={modalId}>
        <Text color="danger">Make Payment</Text>
      </label>
      <input
        className="modal-state"
        id={modalId}
        type="checkbox"
        onClick={openModal}
      />
      {createPortal(
        <>
          {isOpen && (
            <div
              className="modal"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <label className="modal-bg" htmlFor={modalId}></label>
              <div
                className="modal-body paper container container-sm"
                style={{ top: "50%" }}
              >
                <label
                  className="btn-close"
                  htmlFor={modalId}
                  onClick={closeModal}
                >
                  X
                </label>
                <MakePaymentForm accountId={accountId} onSuccess={closeModal} />
              </div>
            </div>
          )}
        </>,
        document.getElementById("modal-root")!,
      )}
    </>
  );
};
