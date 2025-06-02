import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";

import { MakePaymentModal } from "./MakePaymentModal";

// Mock MakePaymentForm to isolate modal behavior
jest.mock("./../MakePaymentForm/MakePaymentForm", () => ({
  MakePaymentForm: ({
    accountId,
    onSuccess,
  }: {
    accountId: string;
    onSuccess: () => void;
  }) => (
    <div data-testid="make-payment-form">
      Form for {accountId}
      <button onClick={onSuccess}>Mock Submit</button>
    </div>
  ),
}));

describe("MakePaymentModal", () => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);

  const setup = () => render(<MakePaymentModal accountId="A-123" />);

  afterEach(() => {
    modalRoot.innerHTML = ""; // Clear the portal contents after each test
  });

  it("renders trigger label", () => {
    setup();
    expect(screen.getByText("Make Payment")).toBeInTheDocument();
  });

  //   it("opens the modal when checkbox is clicked", () => {
  //     setup();

  //     // const checkbox = getByRole("checkbox");
  //     fireEvent.click(screen.getByText("Make Payment"));

  //     expect(screen.getByTestId("make-payment-form")).toBeInTheDocument();
  //     expect(screen.getByText("Form for A-123")).toBeInTheDocument();
  //   });

  //   it("closes the modal when X is clicked", () => {
  //     setup();

  //     // fireEvent.click(getByRole("checkbox"));
  //     fireEvent.click(screen.getByText("Make Payment"));

  //     const closeBtn = screen.getByText("X");
  //     fireEvent.click(closeBtn);

  //     // Modal disappears on close
  //     expect(screen.queryByTestId("make-payment-form")).not.toBeInTheDocument();
  //   });

  it("closes the modal when form calls onSuccess", () => {
    setup();

    // fireEvent.click(getByRole("checkbox"));
    fireEvent.click(screen.getByText("Make Payment"));

    const submitBtn = screen.getByText("Mock Submit");
    fireEvent.click(submitBtn);

    expect(screen.queryByTestId("make-payment-form")).not.toBeInTheDocument();
  });
});
